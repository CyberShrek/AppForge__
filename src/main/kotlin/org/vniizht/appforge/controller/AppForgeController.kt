package org.vniizht.appforge.controller

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.servlet.ModelAndView
import org.vniizht.appforge.store.forgedAppsCache
import org.vniizht.appforge.model.AppConfig
import org.vniizht.appforge.service.AppForgeService
import org.vniizht.appforge.service.checkRequest
import javax.servlet.http.HttpServletRequest

@RestController
class AppForgeController(private val request: HttpServletRequest,
                         private val service: AppForgeService
) {

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun createApp(@RequestBody(required = true) config: AppConfig): ModelAndView {
        checkRequest(request, config.code!!)
        val forgedApp = ModelAndView("forge")
        forgedApp.addObject("config", config)
        forgedApp.addObject("appInfo", service.getInfo(config.code, config.additionalInfo))
        forgedAppsCache[config.name!!] = forgedApp
        return forgedApp
    }

    @GetMapping("/forged/{appName}")
    fun readApp(@PathVariable appName: String) = forgedAppsCache[appName].apply {
        if (this == null)
            throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    @PatchMapping("/forged/{appName}")
    fun updateApp(@PathVariable appName: String,
                  @RequestBody config: AppConfig): ModelAndView {
        deleteApp(appName)
        return createApp(config)
    }

    @DeleteMapping("/forged/{appName}")
    fun deleteApp(@PathVariable appName: String){
        forgedAppsCache.remove(appName)
    }

    @GetMapping("/debug")
    fun debug() = ModelAndView("debug")
}
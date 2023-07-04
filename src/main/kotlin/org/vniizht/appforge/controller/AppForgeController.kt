package org.vniizht.appforge.controller

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.servlet.ModelAndView
import org.vniizht.appforge.data.forgedAppsCache
import org.vniizht.appforge.entity.Config
import javax.servlet.http.HttpServletRequest

@RestController
class AppForgeController(private val request: HttpServletRequest) {

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun createApp(@RequestBody config: Config): ModelAndView {
        val forgedApp = ModelAndView()
        val forgeUrl = with(request){ "$scheme://$serverName:$serverPort$contextPath" }
        forgedApp.addObject(forgeUrl)
        forgedApp.addObject("stylesUrl", "$forgeUrl/css")
        forgedApp.addObject("imagesUrl", "$forgeUrl/img")
        forgedApp.addObject("scriptsUrl", "$forgeUrl/js")
        forgedApp.viewName = "forge"
        forgedApp.addObject(config)
        forgedAppsCache[config.appName] = forgedApp
        return forgedApp
    }
    @GetMapping("/forged/{appName}")
    fun readApp(@PathVariable appName: String) = forgedAppsCache[appName].apply {
        if (this == null)
            throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    @PatchMapping("/forged/{appName}")
    fun updateApp(@PathVariable appName: String,
                  @RequestBody config: Config): ModelAndView {
        deleteApp(appName)
        return createApp(config)
    }

    @DeleteMapping("/forged/{appName}")
    fun deleteApp(@PathVariable appName: String){
        forgedAppsCache.remove(appName)
    }

    @GetMapping("/debug")
    fun debug() = createApp(
        Config(
            appName = "debug",
            titleName = "AppForgeDebug",
            mainForm = Config.MainForm(
                mapOf("period" to Config.MainForm.Period(
                    title = "Период"
                ))
            ),
            reports = setOf(
                Config.Report(title = "Debug")
            )
        ).also {
            println(it.toString())
        }
    )
}
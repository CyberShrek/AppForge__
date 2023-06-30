package org.vniizht.appforge.controller

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.servlet.ModelAndView
import org.vniizht.appforge.data.forgedAppsCache
import org.vniizht.appforge.entity.Config

@RestController
class AppForgeController {

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun forgeApp(@RequestBody config: Config): ModelAndView {
        val forgedApp = ModelAndView()
        forgedApp.viewName = "forge"
        forgedApp.addObject(config)
        forgedAppsCache[config.appName] = forgedApp
        return forgedApp
    }

    @GetMapping("/forged/{appName}")
    fun getApp(@PathVariable appName: String) = forgedAppsCache[appName].apply {
        if (this == null)
            throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    @GetMapping("/debug")
    fun debug() = forgeApp(
        Config(
            appName = "debug",
            titleName = "AppForgeDebug",
            reports = setOf(
                Config.Report(title = "Debug 0"), Config.Report(title = "Debug 1"), Config.Report(title = "Debug 2")
            )
        )
    )
}
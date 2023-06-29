package org.vniizht.appforge.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ResourceLoader
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.servlet.ModelAndView
import org.vniizht.appforge.data.forgedAppsCache
import org.vniizht.appforge.entity.Config


@Controller
class AppForgeController {

    @Autowired
    private lateinit var resourceLoader: ResourceLoader

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE])
    @ResponseBody
    fun forgeApp(@RequestBody config: Config): ModelAndView {
        val forgedApp = ModelAndView()
        forgedApp.viewName = "forge.html"
        forgedApp.addObject(config)
        forgedAppsCache[config.appName] = forgedApp
        return forgedApp
    }

    @GetMapping("/{appName}")
    fun getApp(@PathVariable appName: String) = forgedAppsCache[appName].apply {
        if (this == null)
            throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }
}
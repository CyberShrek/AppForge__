package org.vniizht.appforge.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.servlet.ModelAndView
import org.vniizht.appforge.data.forgedAppsCache
import org.vniizht.appforge.entity.Config
import javax.servlet.http.HttpServletRequest

@RestController
class AppForgeController(@Autowired val request: HttpServletRequest) {

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun createApp(@RequestBody config: Config): ModelAndView {
        val forgedApp = ModelAndView()
        forgedApp.viewName = "forge"
        forgedApp.addObject(config)
        forgedApp.addObject(SourcesResolver(config))
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
                period = Config.MainForm.Period(

                )
            ),
            reports = setOf(
                Config.Report(title = "Debug")
            )
        )
    )

    private inner class SourcesResolver(config: Config){

        val forgeUrl = with(request){ "$scheme://$serverName:$serverPort$contextPath" }
        val cssSources: Set<String> = mutableSetOf(nameToCss("root"))
        val jsSources:  Set<String> = mutableSetOf(nameToJs("index"))

        fun nameToCss(name: String) = "${forgeUrl}/css/$name.css"
        fun nameToSvg(name: String) = "${forgeUrl}/img/$name.svg"
        fun nameToJs(name: String) = "${forgeUrl}/js/$name.js"

        init {
            fun String.addAsCss() = (cssSources as MutableSet).add(nameToCss(this))
            fun String.addAsJs() = (jsSources as MutableSet).add(nameToJs(this))

            config.apply {
                mainForm?.apply {
                    "main-form".addAsCss()
                }
                reports?.apply {
                    "report/root".addAsCss()
                }
            }
        }
    }
}
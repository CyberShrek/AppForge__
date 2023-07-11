package org.vniizht.appforge.controller

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.servlet.ModelAndView
import org.vniizht.appforge.data.forgedAppsCache
import org.vniizht.appforge.entities.AppConfig
import org.vniizht.appforge.entities.FormSectionConfig
import org.vniizht.appforge.entities.MainFormConfig
import org.vniizht.appforge.entities.ReportSlotConfig
import javax.servlet.http.HttpServletRequest

@RestController
class AppForgeController(private val request: HttpServletRequest) {

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun createApp(@RequestBody config: AppConfig): ModelAndView {
        val forgedApp = ModelAndView("forge")
//        forgedApp.addObject("forgeUrl", with(request){ "$scheme://$serverName:$serverPort$contextPath" })
        forgedApp.addObject("config", config)
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
                  @RequestBody config: AppConfig): ModelAndView {
        deleteApp(appName)
        return createApp(config)
    }

    @DeleteMapping("/forged/{appName}")
    fun deleteApp(@PathVariable appName: String){
        forgedAppsCache.remove(appName)
    }

    @GetMapping("/debug")
    fun debug() = createApp(
        AppConfig(
            appName = "debug",
            titleName = "AppForgeDebug",
            mainForm = MainFormConfig(
                mapOf("period" to FormSectionConfig(
                    title = "Период",
                    fieldsMap = mapOf(
                        "range" to FormSectionConfig.Datepicker(maxDays = 10),
                        "list" to FormSectionConfig.Select(
                            title = "Some list"
                        )
                    )
                ))
            ),
            reportSlots = mapOf(
                "debug" to ReportSlotConfig(title = "Debug")
            )
        )
    )
}
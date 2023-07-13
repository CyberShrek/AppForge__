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
                mapOf(
                    "period" to FormSectionConfig(
                        title = "Период",
                        fieldsMap = mapOf(
                            "range" to FormSectionConfig.Datepicker(
                                maxDays = 10
                            )
                        )
                    ),
                    "waypoint" to FormSectionConfig(
                        title = "Назначения",
                        fieldsMap = mapOf(
                            "countries" to FormSectionConfig.Select(
                                title = "Государства",
                                content = FormSectionConfig.Select.Content(
                                    serviceBankCountries = FormSectionConfig.Select.Content.ServiceBankCountries(
                                        subscribeToDate = "period.range"
                                    ),
                                    showCodes = true
                                )
                            ),
                            "roads" to FormSectionConfig.Select(
                                title = "Дороги",
                                content = FormSectionConfig.Select.Content(
                                    serviceBankRoads = FormSectionConfig.Select.Content.ServiceBankRoads(
                                        subscribeToDate = "period.range",
                                        subscribeToCountries = "waypoint.countries"
                                    ),
                                    showCodes = true
                                )
                            ),
                            "stations" to FormSectionConfig.Select(
                                title = "Станции",
                                content = FormSectionConfig.Select.Content(
                                    serviceBankStations = FormSectionConfig.Select.Content.ServiceBankStations(
                                        subscribeToDate = "period.range",
                                        subscribeToRoads = "waypoint.roads",
                                        extraProperties = mapOf("prpop" to "1")
                                    ),
                                    showCodes = true
                                )
                            ),
                        )
                    )
                )
            ),
            reportSlots = mapOf(
                "debug" to ReportSlotConfig(title = "Debug")
            )
        )
    )
}
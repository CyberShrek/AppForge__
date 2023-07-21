package org.vniizht.appforge.controller

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.servlet.ModelAndView
import org.vniizht.appforge.data.forgedAppsCache
import org.vniizht.appforge.entities.AppConfig
import org.vniizht.appforge.entities.AppConfig.MainFormConfig
import org.vniizht.appforge.entities.AppConfig.MainFormConfig.FormSectionConfig
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
    fun debug() = ModelAndView("debug")

//        TODO temp debug
    @GetMapping("/baggages")
    fun baggage(request: HttpServletRequest): ModelAndView {
        return createApp(
            AppConfig(
                titleName = "Анализ корреспонденции по багажным перевозкам",
                appGroup = AppConfig.AppGroup(
                    url = "/pril-web/faces/pril/List.xhtml?init=true&namepril=ESUBR",
                    name = "Багажные работы"
                ),
                appName = "Корреспонденции",
                mainForm = AppConfig.MainFormConfig(
                    mapOf(
                        "period" to AppConfig.MainFormConfig.FormSectionConfig(
                            title = "Период",
                            fields = mapOf(
                                "range" to FormSectionConfig.Date(),
                                "compare" to MainFormConfig.FormSectionConfig.CheckBox("Сравнить с прошлым годом"),
                                "separate" to FormSectionConfig.Select(
                                    "Сепарировать",
                                    optionsSources = FormSectionConfig.Select.Content(
                                        endpoint = FormSectionConfig.Select.Content.Endpoint(
                                            url = "baggages/main-form-options/period/separation"
                                        )
                                    )
                                )
                            )
                        ),
                        "carriers" to AppConfig.MainFormConfig.FormSectionConfig(
                            title = "Перевозчики",
                            fields = mapOf(
                                "carrier" to AppConfig.MainFormConfig.FormSectionConfig.Select(
                                    search = true,
                                    required = true,
                                    optionsSources = AppConfig.MainFormConfig.FormSectionConfig.Select.Content(
                                        serviceBank = FormSectionConfig.Select.Content.ServiceBankCarriers(
                                            subscribeToDate = "period.range"
                                        )
                                    )
                                )
                            )
                        ),
                        "shipment" to AppConfig.MainFormConfig.FormSectionConfig(
                            title = "Тип отправки",
                            fields = mapOf(
                                "type" to FormSectionConfig.Select(
                                    title = "Тип",
                                    required = true,
                                    optionsSources = FormSectionConfig.Select.Content(
                                        endpoint = FormSectionConfig.Select.Content.Endpoint(
                                            url = "baggages/main-form-options/shipment/kind"
                                        ),
                                        default = setOf("1")
                                    )
                                ),
                                "kind" to FormSectionConfig.Select(
                                    title = "Виды",
                                    optionsSources = FormSectionConfig.Select.Content(
                                        endpoint = FormSectionConfig.Select.Content.Endpoint(
                                            url = "baggages/main-form-options/shipment/kind",
                                            subscribeToFields = setOf("shipment.type")
                                        )
                                    )
                                ),
                                "extra" to FormSectionConfig.Select(
                                    title = "Дополнительно",
                                    optionsSources = FormSectionConfig.Select.Content(
                                        endpoint = FormSectionConfig.Select.Content.Endpoint(
                                            url = "baggages/main-form-options/shipment/extra",
                                            subscribeToFields = setOf("shipment.type", "shipment.kind")
                                        )
                                    )
                                )
                            )
                        ),
                        "departure" to FormSectionConfig(
                            title = "Объекты отправления",
                            fields = mapOf(
                                "postSoviet" to FormSectionConfig.CheckBox(
                                    title = "Только СНГ и страны Балтии"
                                ),
                                "countries" to FormSectionConfig.Select(
                                    title = "Государства",
                                    multiple = true,
                                    search = true,
                                    required = true,
                                    optionsSources = FormSectionConfig.Select.Content(
                                        serviceBank = FormSectionConfig.Select.Content.ServiceBankCountries(
                                            subscribeToDate = "period.range",
                                            subscribeToPostSovietCheckbox = "departure.postSoviet"
                                        )
                                    )
                                ),
                                "roads" to FormSectionConfig.Select(
                                    title = "Дороги",
                                    multiple = true,
                                    search = true,
                                    optionsSources = FormSectionConfig.Select.Content(
                                        serviceBank = FormSectionConfig.Select.Content.ServiceBankRoads(
                                            subscribeToDate = "period.range",
                                            subscribeToCountries = "departure.countries"
                                        )
                                    )
                                ),
                                "stations" to FormSectionConfig.Select(
                                    title = "Станции",
                                    multiple = true,
                                    search = true,
                                    optionsSources = FormSectionConfig.Select.Content(
                                        serviceBank = FormSectionConfig.Select.Content.ServiceBankStations(
                                            subscribeToDate = "period.range",
                                            subscribeToRoads = "departure.roads",
                                            extraProperties = mapOf("prpop" to "1")
                                        )
                                    )
                                ),
                            )
                        ),
                        "destination" to FormSectionConfig(
                            title = "Объекты назначения",
                            fields = mapOf(
                                "postSoviet" to FormSectionConfig.CheckBox(
                                    title = "Только СНГ и страны Балтии"
                                ),
                                "countries" to FormSectionConfig.Select(
                                    title = "Государства",
                                    multiple = true,
                                    search = true,
                                    optionsSources = FormSectionConfig.Select.Content(
                                        serviceBank = FormSectionConfig.Select.Content.ServiceBankCountries(
                                            subscribeToDate = "period.range",
                                            subscribeToPostSovietCheckbox = "destination.postSoviet"
                                        )
                                    )
                                ),
                                "roads" to FormSectionConfig.Select(
                                    title = "Дороги",
                                    multiple = true,
                                    search = true,
                                    optionsSources = FormSectionConfig.Select.Content(
                                        serviceBank = FormSectionConfig.Select.Content.ServiceBankRoads(
                                            subscribeToDate = "period.range",
                                            subscribeToCountries = "destination.countries"
                                        )
                                    )
                                ),
                                "stations" to FormSectionConfig.Select(
                                    title = "Станции",
                                    multiple = true,
                                    search = true,
                                    optionsSources = FormSectionConfig.Select.Content(
                                        serviceBank = FormSectionConfig.Select.Content.ServiceBankStations(
                                            subscribeToDate = "period.range",
                                            subscribeToRoads = "destination.roads",
                                            extraProperties = mapOf("prpop" to "1")
                                        )
                                    )
                                ),
                            )
                        )
                    )
                ),
                reportSlots = mapOf(
                    "debug" to AppConfig.ReportSlotConfig(title = "")
                )
            )
        )
    }


    @GetMapping("/baggages/main-form-options/period/separation")
    fun getPeriodSeparationOptions(): Map<String, String> = mapOf(
        "DAYS" to "По дням",
        "MONTHS" to "По месяцам",
        "YEARS" to "По годам"
    )

    @GetMapping("/baggages/main-form-options/shipment/type")
    fun getShipmentTypeOptions(): Map<String, String> = mapOf(
        "1" to "Багаж",
        "2" to "Гр/баг (мелкие)",
        "3" to "Гр/баг (повагонные)",
        "4" to "Почта"
    )

    @GetMapping("/baggages/main-form-options/shipment/kind")
    fun getShipmentKindOptions(
        @RequestHeader(value = "shipment.type", required = true) shipmentType: String
    ): Map<String, String>{
        return when(shipmentType){
            "1", "2" -> mapOf(
                "0" to "Все",
                "1" to "На руках пассажира",
                "2" to "В спецкупе",
                "3" to "Трансп. средства"
            )
            "3" -> mapOf(
                "0" to "Все",
                "1" to "Багажные (А+С)",
                "2" to "Банковские",
                "3" to "Служебно-технические",
                "4" to "Новые",
                "5" to "Автовагоны",
                "6" to "Ваг-магазин",
                "7" to "Ваг-ресторан",
                "8" to "Пассажирские",
                // "9" to "Пробег почтовых вагонов",
                "10" to "Пробег плановых багажных вагонов",
                "11" to "Пробег вагонов с пассажирами"
            )
            else -> emptyMap()
        }
    }

    @GetMapping("/baggages/main-form-options/shipment/extra")
    fun getShipmentExtraOptions(
        @RequestHeader(value = "shipment.type", required = true) shipmentType: String,
        @RequestHeader(value = "shipment.kind", required = false) shipmentKind: String?
    ): Map<String, String>{
        return when(shipmentType){
            "1", "2" -> when(shipmentKind) {
                "3" -> emptyMap()
                else -> mapOf(
                    "0" to "Все",
                    "1" to "Живность",
                    "2" to "Ручная кладь",
                    "3" to "Малогабарит"
                )
            }
            else -> mapOf(
                "4" to "В ремонт"
            )
        }
    }
}
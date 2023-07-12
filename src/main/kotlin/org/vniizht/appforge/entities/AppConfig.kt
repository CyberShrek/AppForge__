package org.vniizht.appforge.entities

data class AppConfig(
    val appName: String,
    val appGroup: AppGroup? = null,
    val titleName: String = appName,
    val mainForm: MainFormConfig? = null,
    // Key is the report id
    val reportSlots: Map<String, ReportSlotConfig>? = null
)
data class AppGroup(
    val name: String,
    val url: String
)
data class MainFormConfig(
    // Key is the section id
    val sectionsMap: Map<String, FormSectionConfig>
)
data class FormSectionConfig(
    val title: String? = null,
    // Key is the field id
    val fieldsMap: Map<String, Field>? = null
) {
    abstract class Field(
        open val title: String? = null,
        val type: String
    )

    data class CheckBox(
        override val title: String?
    ) : Field(title, "checkbox")

    data class Datepicker(
        override val title: String? = null,
        val maxDays: Int? = null
    ) : Field(title, "datepicker")

    data class Select(
        override val title: String? = null,
        val content: Content? = null
    ) : Field(title, "select"){
        data class Content(
            val staticMap: Map<String, String>? = null,
            val dynamicMap: DynamicMap? = null,
            val serviceBankCarriers: ServiceBankCarriers? = null,
            val serviceBankCountries: ServiceBankCountries? = null,
            val serviceBankRoads: ServiceBankRoads? = null,
            val serviceBankStations: ServiceBankStations? = null
        ){
            data class DynamicMap(
                val subscribeOnFields: Set<String>,
                val sourceUrl: String
            )
            data class ServiceBankCarriers(
                val subscribeOnDate: String,
                val extraProperties: Map<String, String>? = null
            )
            data class ServiceBankCountries(
                val subscribeOnDate: String,
                val extraProperties: Map<String, String>? = null
            )
            data class ServiceBankRoads(
                val subscribeOnDate: String,
                val subscribeOnCountries: String,
                val extraProperties: Map<String, String>? = null
            )
            data class ServiceBankStations(
                val subscribeOnDate: String,
                val subscribeOnRoads: String,
                val extraProperties: Map<String, String>? = null
            )
        }

    }
}
data class ReportSlotConfig(
    val title: String,
    val isModal: Boolean = false
)
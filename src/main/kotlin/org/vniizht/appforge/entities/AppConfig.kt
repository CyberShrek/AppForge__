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
    val fieldsMap: Map<String, SectionField>? = null
) {
    abstract class SectionField(
        open val title: String? = null
    )

    data class CheckBox(
        override val title: String?
    ) : SectionField(title)

    data class Datepicker(
        override val title: String? = null,
        val maxDays: Int? = null
    ) : SectionField(title)

    data class Select(
        override val title: String? = null,
        val content: Content? = null
    ) : SectionField(title){
        data class Content(
            val staticMap: Map<String, String>? = null,
            val dynamicMap: DynamicMap? = null,
            val serviceBankCarriers: ServiceBankCarriers? = null,
            val serviceBankCountries: ServiceBankCountries? = null,
            val serviceBankRoads: ServiceBankRoads? = null,
            val serviceBankStations: ServiceBankStations? = null
        ){
            data class DynamicMap(
                val dependsOnFields: Map<String, String>,
                val httpGet: String
            )
            data class ServiceBankCarriers(
                val dependsOnDate: String,
                val extraProperties: Map<String, String>
            )
            data class ServiceBankCountries(
                val dependsOnDate: String,
                val extraProperties: Map<String, String>
            )
            data class ServiceBankRoads(
                val dependsOnDate: String,
                val dependsOnCountries: String,
                val extraProperties: Map<String, String>
            )
            data class ServiceBankStations(
                val dependsOnDate: String,
                val dependsOnRoads: String,
                val extraProperties: Map<String, String>
            )
        }

    }
}
data class ReportSlotConfig(
    val title: String,
    val isModal: Boolean = false
)
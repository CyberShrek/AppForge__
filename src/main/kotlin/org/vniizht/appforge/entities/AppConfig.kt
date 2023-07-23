package org.vniizht.appforge.entities

import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo

data class AppConfig(
    val appName: String,
    val appGroup: AppGroup? = null,
    val titleName: String = appName,
    val mainForm: MainFormConfig? = null,
    // Key is the report id
    val reportSlots: Map<String, ReportSlotConfig>? = null
) {
    data class AppGroup(
        val name: String,
        val url: String
    )

    data class MainFormConfig(
        // Key is the section id
        val sections: Map<String, FormSectionConfig>,
        val validationUrl: String? = null
    ) {
        data class FormSectionConfig(
            val title: String? = null,
            // Key is the field id
            val fields: Map<String, Field>? = null
        ) {
            @JsonTypeInfo(
                use = JsonTypeInfo.Id.NAME,
                include = JsonTypeInfo.As.PROPERTY,
                property = "type"
            )
            @JsonSubTypes(
                JsonSubTypes.Type(value = CheckBox::class, name = "checkbox"),
                JsonSubTypes.Type(value = Date::class, name = "date"),
                JsonSubTypes.Type(value = Select::class, name = "select")
            )
            abstract class Field(
                open val type: String,
                open val title: String? = null
            )

            data class CheckBox(
                override val title: String = ""
            ) : Field("checkbox", title)

            data class Date(
                override val title: String? = null,
                val maxDays: Int? = null
            ) : Field("date", title)

            data class Select(
                override val title: String? = null,
                val showCodes: Boolean = false,
                val search: Boolean = false,
                val multiple: Boolean = false,
                val disableSelectAll: Boolean = false,
                val required: Boolean = false,
                val maxValues: Int = 0,
                val optionSources: OptionSources? = null
            ) : Field("select", title) {

                data class OptionSources(
                    val endpoint: Endpoint? = null,
                    val serviceBank: ServiceBank? = null
                ) {
                    data class Endpoint(
                        val url: String,
                        val subscribeToFields: Set<String> = setOf()
                    )

                    @JsonTypeInfo(
                        use = JsonTypeInfo.Id.NAME,
                        include = JsonTypeInfo.As.PROPERTY,
                        property = "type"
                    )
                    @JsonSubTypes(
                        JsonSubTypes.Type(value = ServiceBankCarriers::class, name = "carriers"),
                        JsonSubTypes.Type(value = ServiceBankCountries::class, name = "countries"),
                        JsonSubTypes.Type(value = ServiceBankRoads::class, name = "roads"),
                        JsonSubTypes.Type(value = ServiceBankStations::class, name = "stations")
                    )
                    abstract class ServiceBank(
                        val type: String,
                        open val subscribeToDate: String,
                        open val extraProperties: Map<String, String>? = null
                    )

                    data class ServiceBankCarriers(
                        override val subscribeToDate: String,
                        override val extraProperties: Map<String, String>? = null
                    ) : ServiceBank("carriers", subscribeToDate, extraProperties)

                    data class ServiceBankCountries(
                        override val subscribeToDate: String,
                        override val extraProperties: Map<String, String>? = null,
                        val subscribeToPostSovietCheckbox: String? = null
                    ) : ServiceBank("countries", subscribeToDate, extraProperties)

                    data class ServiceBankRoads(
                        override val subscribeToDate: String,
                        override val extraProperties: Map<String, String>? = null,
                        val subscribeToCountries: String
                    ) : ServiceBank("roads", subscribeToDate, extraProperties)

                    data class ServiceBankStations(
                        override val subscribeToDate: String,
                        override val extraProperties: Map<String, String>? = null,
                        val subscribeToRoads: String,
                    ) : ServiceBank("stations", subscribeToDate, extraProperties)
                }
            }
        }
    }

    data class ReportSlotConfig(
        val title: String,
        val isModal: Boolean = false
    )
}
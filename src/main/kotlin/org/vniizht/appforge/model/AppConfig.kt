package org.vniizht.appforge.model

import com.fasterxml.jackson.annotation.*
import com.fasterxml.jackson.annotation.JsonInclude.Include

@JsonInclude(Include.NON_NULL)
data class AppConfig(
    @JsonProperty(required = true)
    val code: String?,
    @JsonProperty(required = true)
    val name: String?,
    val group: AppGroup? = null,
    val title: String? = name,
    @JsonProperty(required = true)
    val mainForm: MainFormConfig?,
    @JsonProperty(required = true)
    val reportSlots: Map<String, ReportSlotConfig>?, // Key is the report id
    val additionalInfo: String? = null
) {
    data class AppGroup(
        val name: String?,
        val path: String?
    )
    data class MainFormConfig(
        // Key is the section id
        val sections: Map<String, FormSectionConfig>?,
        val validationPath: String? = "validate",
        val confirmButtonText: String? = "Подтвердить"
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
                open val type: String?,
                open val label: String? = null
            )

            data class CheckBox(
                override val label: String = ""
            ) : Field("checkbox", label)

            data class Date(
                override val label: String? = null,
                val maxDays: Int? = null
            ) : Field("date", label)

            data class Select(
                override val label: String? = "",
                val showCodes: Boolean = false,
                val search: Boolean = false,
                val multiple: Boolean = false,
                val disableSelectAll: Boolean = false,
                val maxValues: Int = 0,
                val optionsSource: OptionsSource? = null
            ) : Field("select", label) {

                data class OptionsSource(
                    val endpoint: Endpoint? = null,
                    val serviceBank: ServiceBank? = null
                ) {
                    data class Endpoint(
                        val path: String?,
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
                        val type: String?,
                        open val subscribeToDate: String?,
                        open val extraProperties: Map<String, String>? = null
                    )

                    data class ServiceBankCarriers(
                        override val subscribeToDate: String?,
                        override val extraProperties: Map<String, String>? = null
                    ) : ServiceBank("carriers", subscribeToDate, extraProperties)

                    data class ServiceBankCountries(
                        override val subscribeToDate: String?,
                        override val extraProperties: Map<String, String>? = null,
                        val subscribeToPostSovietCheckbox: String? = null
                    ) : ServiceBank("countries", subscribeToDate, extraProperties)

                    data class ServiceBankRoads(
                        override val subscribeToDate: String?,
                        override val extraProperties: Map<String, String>? = null,
                        val subscribeToCountries: String?
                    ) : ServiceBank("roads", subscribeToDate, extraProperties)

                    data class ServiceBankStations(
                        override val subscribeToDate: String?,
                        override val extraProperties: Map<String, String>? = null,
                        val subscribeToRoads: String?,
                    ) : ServiceBank("stations", subscribeToDate, extraProperties)
                }
            }
        }
    }

    data class ReportSlotConfig(
        val title: String?,
        val isModal: Boolean? = false,
        val path: String?
    )
}
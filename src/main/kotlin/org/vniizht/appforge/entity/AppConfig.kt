package org.vniizht.appforge.entity

data class AppConfig(
    val appName: String,
    val appGroup: AppGroup? = null,
    val titleName: String = appName,
    val mainForm: MainForm? = null,
    // Key is report id
    val reportSlots: Map<String, ReportSlot>? = null
){
    data class AppGroup(
        val name: String,
        val url: String
    )
    data class MainForm(
        // Key is section id
        val sectionsMap: Map<String, Section>
    ) {
        abstract class Section(
            val type: String,
            open val title: String? = null
        )
        data class Period(
            override val title: String? = null,
            val maxDays: Int? = null,
            val addComparison: Boolean = false,
            val addSeparation: Boolean = false
        ): Section("PERIOD", title)
        data class Carrier(
            override val title: String? = null,
            val maxCarriers: Int? = null
        ): Section("CARRIER", title)
        data class Waypoint(
            override val title: String? = null
        ): Section("WAYPOINT", title)
        // Bullshit
        data class Shipment(
            override val title: String? = null,
            val types: Set<Any>,
            val transferTypes: Set<Any>,
            val carriageTypes: Set<Any>,
            val transferAdditional: Set<Any>,
            val carriageAdditional: Set<Any>
        ): Section("SHIPMENT", title)
    }
    data class ReportSlot(
        val title: String,
        val isModal: Boolean = false
    )
}
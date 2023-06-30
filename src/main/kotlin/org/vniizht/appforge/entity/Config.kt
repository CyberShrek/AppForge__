package org.vniizht.appforge.entity

data class Config(
    val appName: String,
    val titleName: String = appName,
    val mainForm: MainForm? = null,
    val reports: Set<Report>? = null
){
    data class MainForm(
        val period: Period? = null,
        val carrier: Carrier? = null,
        val shipmentType: ShipmentType? = null,
        val departure: Waypoint? = null,
        val destination: Waypoint? = null,
    ) {
        data class Period(
            val title: String? = null,
            val maxDays: Int? = null,
            val addComparison: Boolean = false,
            val addSeparation: Boolean = false
        )
        data class Carrier(
            val title: String? = null,
            val maxCarriers: Int? = null
        )
        // Bullshit
        data class ShipmentType(
            val title: String? = null,
            val types: Set<Any>,
            val transferTypes: Set<Any>,
            val carriageTypes: Set<Any>,
            val transferAdditional: Set<Any>,
            val carriageAdditional: Set<Any>
        )
        data class Waypoint(
            val title: String? = null
        )
    }

    data class Report(
        val title: String? = null,
        val isModal: Boolean = false,
        val labels: Set<Label>? = null,
        val charts: Set<Chart>? = null,
        val table: Table? = null
    ){
        data class Label(
            val title: String,
            val type: String,
            val imageSrc: String,
            val color: String,
            val sourceColumn: Int
        )
        data class Chart(
            val title: String,
            val label: String,
            val type: String? = null,
            val color: String? = null,
            val labelsColumnNum: Int,
            val valuesColumnNum: Int
        )
        data class Table(
            val columns: Set<Column>,
            val primaryColumnsNum: Int,
            val groupColumns: Int? = null,
            val pagination: Int? = null,
            val style: Style = Style.DEFAULT,
            val interaction: Interaction
        ){
            data class Column(
                val name: String,
                val addFilter: Boolean = false,
                val cellsWithImage: Set<CellWithImage>? = null,
                val addProportion: Boolean = false,
                val addComparison: Boolean = false
            ){
                data class CellWithImage(
                    val targetCellContent: String,
                    val image: String
                )
            }
            data class Interaction(
                val reportsViaRows: Set<String>? = null,
                val reportsViaCells: Set<ReportViaCells>? = null
            ){
                data class ReportViaCells(
                    val reportName: String? = null,
                    val targetColumnNum: Int,
                    val targetCellContent: String,
                )
            }
            enum class Style {
                DEFAULT,
                SIMPLIFIED
            }
        }
    }
}
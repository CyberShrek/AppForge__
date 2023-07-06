package org.vniizht.appforge.entity

data class ReportConfig (
    val title: String? = null,
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
        val groupPrimaryColumns: Boolean = false,
        val pagination: Int? = null,
        val style: Style = Style.DEFAULT,
        val showTotal: Boolean = false,
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
            val reportsViaRows: Set<ReportViaRows>? = null,
            val reportsViaCells: Set<ReportViaCells>? = null
        ){
            data class ReportViaRows(
                val reportName: String? = null,
                val icon: String
            )
            data class ReportViaCells(
                val reportName: String? = null,
                val targetColumnNum: Int,
                val targetCellContent: String
            )
        }
        enum class Style {
            DEFAULT,
            SIMPLIFIED
        }
    }
}
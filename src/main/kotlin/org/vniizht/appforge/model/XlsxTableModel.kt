package org.vniizht.appforge.model

data class XlsxTableModel (
    val context: List<String>? = listOf(),
    val title:   String? = null,
    val head: List<List<CompleteCell>> = listOf(),
    val body:   List<List<CompleteCell>> = listOf()
)

data class CompleteCell(
    val value: String = "",
    val rowspan: Int = 1,
    val colspan: Int = 1,
    val total: Boolean = false,
    val type: String = "string"
)

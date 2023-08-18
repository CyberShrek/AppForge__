package org.vniizht.appforge.model

data class XlsxTableModel (
    val name:  String? = null,
    val context: List<String>? = listOf(),
    val title:   String? = null,
    val header: List<List<CompleteCell>> = listOf(),
    val body:   List<List<CompleteCell>> = listOf(),
    val total:  List<CompleteCell> = listOf()
)

data class CompleteCell(
    val text: String = "",
    val rowspan: Int = 1,
    val colspan: Int = 1
)

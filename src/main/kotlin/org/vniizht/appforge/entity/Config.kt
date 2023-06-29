package org.vniizht.appforge.entity

data class Config(
    val appName: String,
    val titleName: String = appName,
    val shits: List<String> = listOf("the first shit", "the second shit", "the third shit")
)

package org.vniizht.appforge.model

data class UserInfo (
    val isSuperUser: Boolean,
    val carrier: Int,
    val country: String,
    val road: String,
    val agent: Int
)
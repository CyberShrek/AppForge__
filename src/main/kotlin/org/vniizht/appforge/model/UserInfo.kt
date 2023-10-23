package org.vniizht.appforge.model

data class UserInfo (
    val superUser: Boolean,
    val carrier: Int,
    val country: String,
    val road: String,
    val agent: Int,
    val create: Boolean,
    val read: Boolean,
    val update: Boolean,
    val delete: Boolean,
    val load: Boolean,
    val download: Boolean
)
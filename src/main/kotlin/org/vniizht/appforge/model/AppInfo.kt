package org.vniizht.appforge.model

const val noDataText = "Нет данных"

data class AppInfo (
    val name: String? = noDataText,               // название
    val groupName: String? = noDataText,          // название приложения верхнего ур.
    val path: String? = noDataText,               // путь
    val groupPath: String? = noDataText,          // путь к приложению верхнего ур.
    val version: String? = noDataText,            // версия
    val releaseDate: String? = noDataText,        // дата выхода
    val updateDate: String? = noDataText,         // дата последнего обновления
    val technologistName: String? = noDataText,   // имя технолога
    val technologistPhone: String? = noDataText,  // телефон технолога
    val technologistMail: String? = noDataText,   // почта технолога
    val helpPath: String? = noDataText,           // путь к помощи
    val comment: String? = noDataText,            // сообщение о ЕСПП
    val tables: Array<String>? = arrayOf(noDataText),  // список таблиц
    val instructionPath: String? = noDataText         // Путь к руководсту пользователя=
)


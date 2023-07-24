package org.vniizht.appforge.entities

data class AppInfo (
    val name: String? = null,               // название
    val superName: String? = null,          // название приложения верхнего ур.
    val path: String? = null,               // путь
    val superPath: String? = null,          // путь к приложению верхнего ур.
    val version: String? = null,            // версия
    val releaseDate: String? = null,        // дата выхода
    val updateDate: String? = null,         // дата последнего обновления
    val technologistName: String? = null,   // имя технолога
    val technologistPhone: String? = null,  // телефон технолога
    val technologistMail: String? = null,   // почта технолога
    val helpPath: String? = null,           // путь к помощи
    val comment: String? = null,            // сообщение о ЕСПП
    val tables: Array<String>? = null,       // список таблиц
    val instructionPath: String? = null          // Путь к руководсту пользователя
)
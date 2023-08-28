package org.vniizht.appforge.model

data class AppInfo (
    val name: String,               // название
    val groupName: String,          // название приложения верхнего ур.
    val path: String,               // путь
    val groupPath: String,          // путь к приложению верхнего ур.
    val version: String,            // версия
    val releaseDate: String,        // дата выхода
    val updateDate: String,         // дата последнего обновления
    val technologistName: String,   // имя технолога
    val technologistPhone: String,  // телефон технолога
    val technologistMail: String,   // почта технолога
    val helpPath: String,           // путь к помощи
    val comment: String,            // сообщение о ЕСПП
    val tables: Array<String>,  // список таблиц
    val instructionPath: String         // Путь к руководсту пользователя=
)


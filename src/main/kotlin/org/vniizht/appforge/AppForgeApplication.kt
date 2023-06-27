package org.vniizht.appforge

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AppForgeApplication

fun main(args: Array<String>) {
    runApplication<AppForgeApplication>(*args)
}

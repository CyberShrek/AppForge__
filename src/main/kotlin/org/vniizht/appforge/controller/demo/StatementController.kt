package org.vniizht.appforge.controller.demo

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/demo/statement")
class StatementController {

    @PostMapping("/init")
    fun fetchInitStatement() = mapOf(
        "hideSections" to setOf("checkboxes", "empty", "endpointOptions", "serviceBankOptions"),
        "hideFields" to setOf("checkboxes.checkbox2", "checkboxes.checkbox3", "checkboxes.checkbox4", "checkboxes.checkbox5"),
        "setValues" to mapOf("serviceBankOptions.date" to listOf("2023-09-08"))
    )

    @PostMapping
    fun fetchStatement(@RequestBody fieldValues: Map<String, Any>) = mutableMapOf<String, MutableSet<Any>>().apply{
        fun push(key: String, value: Any) {
            if(!contains(key)) put(key, mutableSetOf())
            get(key)?.add(value)
        }
        fun toggleSection(sectionKey: String, switchField: String) {
            if(fieldValues.contains(switchField))
                push(if(fieldValues[switchField] == true) "showSections" else "hideSections", sectionKey)
        }
        fun toggleField(fieldKey: String, switchField: String) {
            if(fieldValues.contains(switchField))
                push(if(fieldValues[switchField] == true) "showFields" else "hideFields", fieldKey)
        }
        toggleSection("checkboxes", "switches.checkboxes")
        toggleField("checkboxes.checkbox2", "checkboxes.checkbox1")
        toggleField("checkboxes.checkbox3", "checkboxes.checkbox2")
        toggleField("checkboxes.checkbox4", "checkboxes.checkbox3")
        toggleField("checkboxes.checkbox5", "checkboxes.checkbox4")
        toggleSection("empty", "checkboxes.checkbox5")
        toggleSection("endpointOptions", "switches.endpointOptions")
        toggleSection("serviceBankOptions", "switches.serviceBank")
    }
}
package org.vniizht.appforge.controller.debug

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/debug/statement")
class DebugStateController {

    @PostMapping
    fun fetchStatement(
        @RequestBody fieldValues: Map<String, Any>,
        @RequestParam(required = false) trigger: String?) = mutableMapOf<String, MutableSet<Any>>().apply{
            if(fieldValues["thirdSection.firstField"] as Boolean)
                put("hidden", mutableSetOf("firstSection"))

        if(fieldValues["thirdSection.thirdField"] as Boolean)
            put("wrong", mutableSetOf("thirdSection.thirdField"))
    }
}
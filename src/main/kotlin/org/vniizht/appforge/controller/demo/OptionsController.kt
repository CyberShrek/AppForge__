package org.vniizht.appforge.controller.demo

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/demo/options")
class OptionsController {

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun fetch(@RequestBody(required = false)fieldsMap: Map<String, Any>?): Map<String, String>{

        val size = fieldsMap?.size ?: 0




        return generateOptionsMap(if( size > 0 ) size else 20 )
    }
}

private fun generateOptionsMap(size: Int = 20): Map<String, String>{
    val map = mutableMapOf<String, String>()
    for (i in 1..size){
        map[i.toString()] = "Опция $i"
    }
    return map
}
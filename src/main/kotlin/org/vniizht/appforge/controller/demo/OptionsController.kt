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
    fun fetch(@RequestBody(required = false)fieldsMap: Map<String, Map<String, String>>?): Map<String, String>{
        if(!fieldsMap.isNullOrEmpty()){
            fieldsMap["endpointOptions.options1"]?.apply {
                val evenMap = mutableMapOf<String, String>()
                this.keys.forEach{ key ->
                    if(key.toInt() % 2 == 0)
                        evenMap[key] = this[key].toString()
                }
                return evenMap
            }
            fieldsMap["endpointOptions.options2"]?.apply {
                return this.toSortedMap(compareBy { -it.toInt() }).mapKeys { key -> key.toString() }
            }
            return emptyMap()
        }
        return generateOptionsMap()
    }
}

private fun generateOptionsMap(size: Int = 20): Map<String, String>{
    val map = mutableMapOf<String, String>()
    for (i in 1..size){
        map[i.toString()] = "Опция $i"
    }
    return map
}
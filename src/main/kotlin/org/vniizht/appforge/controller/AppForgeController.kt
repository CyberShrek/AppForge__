package org.vniizht.appforge.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping

@Controller
class AppForgeController {



    @PostMapping
    fun forgeApp()= "html/forged.html"



}
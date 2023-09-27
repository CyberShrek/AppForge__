package org.vniizht.appforge.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.annotation.SessionScope
import org.vniizht.appforge.model.UserInfo
import org.vniizht.appforge.service.UserCheck

@RestController
@RequestMapping("/ucheck")
@SessionScope
class UserCheckController(val userCheck: UserCheck) {

    @GetMapping
    fun applyCode(@RequestParam code: String): UserInfo {
        userCheck.createOrContinueSession(code)
        return UserInfo(
            isAdmin = userCheck.ejb!!.isSysAdmin,
            carrier = userCheck.ejb!!.skp,
            country = userCheck.ejb!!.userGos!!,
            road    = userCheck.ejb!!.userDor,
            agent   = userCheck.ejb!!.agent
        )
    }
}
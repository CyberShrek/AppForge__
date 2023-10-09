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
        with(userCheck.ejb!!){
            fun hasPermissionTo(vararg permissions: String) = permissions.find { permission -> getParamI(permission) == 0 } == null
            return UserInfo(
                isSuperUser = true,//hasPermissionTo("create", "read", "update", "delete", "load", "download"),
                carrier     = skp,
                country     = userGos,
                road        = userDor,
                agent       = agent
            )
        }
    }
}
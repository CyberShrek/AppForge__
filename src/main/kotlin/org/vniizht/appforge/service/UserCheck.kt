package org.vniizht.appforge.service

import com.vniizht.ucheck.UserCheckRemote
import org.springframework.stereotype.Service
import org.springframework.web.context.annotation.SessionScope
import org.vniizht.appforge.exceptions.UserCheckException
import javax.annotation.PreDestroy
import javax.naming.InitialContext
import javax.servlet.http.HttpServletRequest

@Service
@SessionScope
class UserCheck(val request: HttpServletRequest) {

    var ejb: UserCheckRemote? = null

    fun createOrContinueSession(code: String) {
        if(ejb == null) {
            try {
                val uCheck =
                    InitialContext().lookup("java:global/UCheck-1.0/UserCheck!com.vniizht.ucheck.UserCheckRemote") as UserCheckRemote
                uCheck.setUser(request.remoteUser)
                uCheck.setTaskCode(code)
                uCheck.setStatTaskCode(code)
                uCheck.setIp(
                    if (request.getHeader("X-Real-IP") != null) request.getHeader("X-Real-IP") else if (request.getHeader(
                            "X-Forwarded-For"
                        ) != null
                    ) request.getHeader("X-Forwarded-For") else request.remoteAddr
                )
                if (!uCheck.check()) {
                    throw Exception("Доступ запрещён")
                }
                ejb = uCheck
            } catch (ex: Exception) {
                throw UserCheckException(ex.message)
            }
        }
    }

    @PreDestroy
    private fun exit(){
        ejb?.SaveTimeExit()
        ejb?.remove()
    }
}
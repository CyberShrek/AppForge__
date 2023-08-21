package org.vniizht.appforge.service

import com.vniizht.ucheck.UserCheckRemote
import java.lang.Exception
import javax.naming.InitialContext
import javax.security.auth.login.LoginException
import javax.servlet.http.HttpServletRequest

// USER-CHECK
private const val EJB_NAME = "java:global/UCheck-1.0/UserCheck!com.vniizht.ucheck.UserCheckRemote"

fun checkRequest(request: HttpServletRequest, taskCode: String){
    try {
        val uCheck = InitialContext().lookup(EJB_NAME) as UserCheckRemote

        uCheck.setUser(request.remoteUser)
        uCheck.setIp(request.remoteAddr)
        uCheck.setTaskCode(taskCode)
        uCheck.setStatTaskCode(taskCode)

        if (!uCheck.check()) throw Exception("Доступ запрещён")
    }
    catch (ex: Exception) {
        throw UserCheckException(ex.message)
    }
}

class UserCheckException(override val message: String?): Exception(message)
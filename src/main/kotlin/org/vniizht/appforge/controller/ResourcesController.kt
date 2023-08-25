package org.vniizht.appforge.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RestController
import org.vniizht.appforge.model.AppInfo
import org.vniizht.prilinfo.PrilInfoRemote
import javax.naming.InitialContext

@RestController
class ResourcesController {

    @GetMapping
    fun getApplicationInfo(@RequestHeader(required = true) code: String): AppInfo {
        val prilInfo = (InitialContext()
            .lookup("global/prilinfo-1.0/PrilInfo!org.vniizht.prilinfo.PrilInfoRemote") as PrilInfoRemote)
            .info(code)

        fun find(key: String) = prilInfo["zadname"] as String?
        fun findAll(key: String) = prilInfo["zadname"] as Array<String>?

        return AppInfo (
            name              = find("zadname"),
            groupName         = find("zadnameV"),
            path              = find("comstr"),
            groupPath         = find("comstrV"),
            version           = find("version"),
            releaseDate       = find("datan"),
            updateDate        = find("dataupd"),
            technologistName  = find("fio"),
            technologistPhone = find("tel"),
            technologistMail  = find("email"),
            helpPath          = find("helpstr"),
            comment           = find("comment"),
            tables            = findAll("pril_tables"),
            instructionPath   = find("helpstr")
        )
    }
}
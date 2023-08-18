package org.vniizht.appforge.service

import org.springframework.stereotype.Service
import org.vniizht.appforge.model.AppInfo
import org.vniizht.prilinfo.PrilInfoRemote
import javax.naming.InitialContext

@Service
class AppForgeService {

    fun getInfo(appCode: String, additionalInfo: String?): AppInfo {
        val info = (InitialContext()
            .lookup("global/prilinfo-1.0/PrilInfo!org.vniizht.prilinfo.PrilInfoRemote") as PrilInfoRemote)
            .info(appCode)

        return AppInfo (
            name              = info["zadname"] as String,
            superName         = info["zadnameV"] as String,
            path              = info["comstr"] as String,
            superPath         = info["comstrV"] as String,
            version           = info["version"] as String,
            releaseDate       = info["datan"] as String,
            updateDate        = "n/d",
            technologistName  = info["fio"] as String,
            technologistPhone = info["tel"] as String,
            technologistMail  = info["email"] as String,
            helpPath          = info["helpstr"] as String,
            comment           = info["comment"] as String,
            tables            = info["pril_tables"] as Array<String>,
            instructionPath   = info["helpstr"] as String,
            additionalInfo
        )
    }
}
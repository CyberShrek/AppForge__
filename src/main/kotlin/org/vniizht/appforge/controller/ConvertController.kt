package org.vniizht.appforge.controller

import org.vniizht.appforge.model.XlsxTableModel
import org.vniizht.appforge.service.XlsxTable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.net.URLEncoder
import javax.servlet.http.HttpServletResponse

@RestController
class ConvertController {

    @PostMapping("/converter/xlsx")
    fun convertToXlsx(@RequestBody model: XlsxTableModel, response: HttpServletResponse) {
        response.setHeader("Content-disposition", "attachment; filename=${
            URLEncoder.encode(model.name, "UTF-8").replace('+', ' ') + ".xlsx"
        }")
        XlsxTable(model).write(response.outputStream)
    }
}
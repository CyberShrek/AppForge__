import wretch from "wretch"
import {setCursorToDefault, setCursorToLoading} from "../misc"
import {popupHttpDataError} from "../modal"

export const fetchReport = (path: string, mainFormValues: FormValues): Promise<ReportModel> => {
    setCursorToLoading()
    return wretch(path)
        .post(mainFormValues)
        .json(json => json)
        .catch(error => popupHttpDataError(error, "Не удалось загрузить отчёт"))
        .finally(setCursorToDefault)
}

export const convertReportToXlsx=(report) => {
    setCursorToLoading()
    wretch("converter/xlsx")
        .post(report)
        .blob(blob => {
            const aElement = document.createElement('a')
            aElement.setAttribute('download', report.title + ".xlsx")
            const href = URL.createObjectURL(blob)
            aElement.href = href
            aElement.setAttribute('target', '_blank')
            aElement.click()
            URL.revokeObjectURL(href)
        })
        .finally(setCursorToDefault)
}
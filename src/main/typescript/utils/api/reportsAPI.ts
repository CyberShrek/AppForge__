import wretch from "wretch"
import {setCursorToDefault, setCursorToLoading} from "../misc";
import error from "svelte/types/compiler/utils/error";
import {popupHttpDataError} from "../modal";

export const fetchReport = (reportId: any, params: object): Promise<any> => {
    setCursorToLoading()
    return wretch("reports/" + reportId)
        .post(params)
        .json()
        .catch(error => popupHttpDataError(error, "Не удалось загрузить отчёт"))
        .finally(setCursorToDefault)
}

export const convertReportToXlsx=(report) =>
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
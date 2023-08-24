import wretch from "wretch"
import {setCursorToDefault, setCursorToLoading} from "../domWizard"
import {popupHttpDataError} from "../modal"
import domtoimage from "dom-to-image";

export const fetchReport = (path: string, values: JsonFieldValues): Promise<ReportModel> => {
    setCursorToLoading()
    return wretch(path)
        .post(values)
        .json(json => json)
        .catch(error => popupHttpDataError(error, "Не удалось загрузить отчёт"))
        .finally(setCursorToDefault)
}

export function downloadXlsx(model: XlsxTableModel) {
    setCursorToLoading()
    wretch("appforge/converter/xlsx")
        .post(model)
        .blob(blob => {
            const aElement = document.createElement('a')
            aElement.setAttribute('download', model.name + ".xlsx")
            const href = URL.createObjectURL(blob)
            aElement.href = href
            aElement.setAttribute('target', '_blank')
            aElement.click()
            URL.revokeObjectURL(href)
        })
        .catch(error => popupHttpDataError(error, "Ошибка экспорта"))
        .finally(setCursorToDefault)
}
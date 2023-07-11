import wretch from "wretch"
import {popupHttpResourceError} from "../modal"

export const fetchAppMetaData=(): Promise<AppMetaData|null> =>
    wretch("../info")
        .get()
        .res(response => response.body as AppMetaData)
        .catch(errorBody => {
            popupHttpResourceError(errorBody, "Не удалось загрузить информацию о приложении")
            return null
        })

export function downloadUserManual(href){
    const link = document.createElement('a')
    link.href = href
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
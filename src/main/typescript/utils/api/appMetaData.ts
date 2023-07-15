import wretch from "wretch"
import {popupHttpDataError} from "../modal"

export const fetchAppMetaData=(): Promise<AppMetaData|null> =>
    wretch("baggages/info")
        .get()
        .json(json => json as AppMetaData)
        .catch(errorBody => {
            popupHttpDataError(errorBody, "Не удалось загрузить информацию о приложении")
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
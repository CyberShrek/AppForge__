import wretch from "wretch"
import {popupHttpResourceError} from "../modal"
import {AppInfo} from "../entities/AppInfo"

export const fetchApplicationInfo=(): Promise<AppInfo|null> =>
    wretch("../info")
        .get()
        .res(response => response.body as AppInfo)
        .catch(errorBody => {
            popupHttpResourceError(errorBody, "Не удалось загрузить информацию о приложении")
            return null
        })

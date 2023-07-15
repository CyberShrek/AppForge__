import wretch from "wretch"
import {popupHttpDataError} from "../modal"
import {jsonToOptions, mapToOptions, setCursorToDefault, setCursorToLoading} from "../misc";

export const fetchOptions = (url: string, headers: Map<string, string>): Promise<Option[]> => {
    setCursorToLoading()
    return wretch(url)
        .headers(Object.fromEntries(headers))
        .get()
        .json(json => jsonToOptions(json))
        .catch(error => {
            popupHttpDataError(error, "Не удалось загрузить список опций")
            return []
        })
        .finally(() => setCursorToDefault())
}

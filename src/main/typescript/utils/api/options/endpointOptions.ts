import wretch from "wretch"
import {popupHttpDataError} from "../../modal"
import {setCursorToDefault, setCursorToLoading} from "../../misc"

export const fetchEndpointOptions = (url: string, headers?: Map<string, string>): Promise<Options> => {
        setCursorToLoading()
        return wretch(url)
            .headers(headers ? Object.fromEntries(headers) : {})
            .get()
            .json(json => new Map<OptionKey, OptionLabel>(Object.entries(json)))
            .catch(error => {
                popupHttpDataError(error, "Не удалось загрузить список опций")
                return new Map()
            })
            .finally(() => setCursorToDefault())
}
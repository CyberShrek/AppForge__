import wretch from "wretch"
import {setCursorToDefault, setCursorToLoading} from "../misc"
import {popupHttpDataError} from "../modal"

export function validateFieldValues(url: string, fieldValues: MainFormValues): Promise<boolean|Map<OptionKey, string>>{
    setCursorToLoading()
    return wretch(url)
        .json(Object.fromEntries(fieldValues))
        .post()
        .forbidden(error => new Map(Object.entries(error.json)))
        .text(() => true)
        .catch(error => {
            popupHttpDataError(error, "Ошибка валидации")
            return false
        })
        .finally(() => setCursorToDefault())
}
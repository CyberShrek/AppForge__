import wretch from "wretch"
import {setCursorToDefault, setCursorToLoading} from "../misc"
import {popupHttpDataError} from "../modal"

export function validate(url: string, objectToValidate: object): Promise<boolean|object>{
    setCursorToLoading()
    return wretch(url)
        .json(objectToValidate)
        .post()
        .forbidden(error => error.json)
        .text(() => true)
        .catch(error => {
            popupHttpDataError(error, "Ошибка валидации")
            return false
        })
        .finally(() => setCursorToDefault())
}
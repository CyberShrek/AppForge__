import wretch from "wretch"
import {jsonifyFields, setCursorToDefault, setCursorToLoading} from "../misc"
import {popupHttpDataError} from "../modal"
import {Field} from "../../fragments/mainForm/fields/Field";

export function validateFields(path: string, fields: Map<FieldKey, Field<any>>): Promise<boolean|Map<OptionKey, string>>{
    setCursorToLoading()
    return wretch(path)
        .post(jsonifyFields(fields))
        .forbidden(error => new Map(Object.entries(error.json)))
        .text(() => true)
        .catch(error => {
            popupHttpDataError(error, "Ошибка валидации")
            return false
        })
        .finally(() => setCursorToDefault())
}
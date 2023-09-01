import wretch from "wretch"
import {setCursorToDefault, setCursorToLoading} from "../util/domWizard"
import {popupHttpDataError} from "../util/modal"
import {Field} from "../fragments/form/section/field/Field";
import {jsonifyFields} from "../util/data";

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
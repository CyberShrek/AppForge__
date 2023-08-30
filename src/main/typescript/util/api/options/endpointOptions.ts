import wretch from "wretch"
import {popupHttpDataError} from "../../modal"
import {setCursorToDefault, setCursorToLoading} from "../../domWizard"
import {Field} from "../../../fragments/form/section/field/Field"
import {jsonifyFields} from "../../data";

export const fetchEndpointOptions = (url: string, fields?: Map<FieldKey, Field<any>>): Promise<Options> => {
        setCursorToLoading()
        return wretch(url)
            .post(fields ? jsonifyFields(fields) : undefined)
            .json(json => new Map<OptionKey, OptionLabel>(Object.entries(json)))
            .catch(error => {
                popupHttpDataError(error, "Не удалось загрузить список опций")
                return new Map()
            })
            .finally(() => setCursorToDefault())
}
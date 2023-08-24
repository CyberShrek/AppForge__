import wretch from "wretch"
import {popupHttpDataError} from "../../modal"
import {setCursorToDefault, setCursorToLoading} from "../../domWizard"
import {Field} from "../../../fragments/mainForm/section/field/Field"
import {jsonifyFields} from "../../data";

export const fetchEndpointOptions = (url: string, subscribedFields?: Map<FieldKey, Field<any>>): Promise<Options> => {
        setCursorToLoading()
        return wretch(url)
            .post(subscribedFields ? jsonifyFields(subscribedFields) : undefined)
            .json(json => new Map<OptionKey, OptionLabel>(Object.entries(json)))
            .catch(error => {
                popupHttpDataError(error, "Не удалось загрузить список опций")
                return new Map()
            })
            .finally(() => setCursorToDefault())
}
import {JsonAccessor} from "./abstract/JsonAccessor";

export class FormStatementAccessor extends JsonAccessor<FormStatement> {
    constructor(override path: string) {
        super()
        this.method = "POST"
        this.errorMessage = "Ошибка получения состояния формы"
    }
}
import {Accessor} from "./Accessor"

export class FormStatementAccessor extends Accessor<FormStatement> {
    constructor(override path: string) {
        super()
        this.method = "POST"
        this.errorMessage = "Ошибка получения состояния формы"
    }
}
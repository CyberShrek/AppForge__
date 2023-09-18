import {JsonAccessor} from "./abstract/JsonAccessor";

export class FormStatementAccessor extends JsonAccessor<FormStatement> {

    override path: string
    constructor() {
        super()
        this.method = "POST"
        this.errorFooter = "Ошибка получения состояния формы"
    }

    override fetch(body: any, trigger?: string): Promise<FormStatement> {
        this.params = {trigger}
        return super.fetch(body)
    }
}
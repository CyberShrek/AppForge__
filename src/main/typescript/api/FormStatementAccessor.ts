import {JsonAccessor} from "./abstract/JsonAccessor";

export class FormStatementAccessor extends JsonAccessor<FormStatement> {

    constructor(override path: string) {
        super()
        this.path = path
        this.method = "POST"
        this.errorFooter = "Ошибка получения состояния формы"
    }

    override fetch(body: any, trigger?: string): Promise<FormStatement> {

        if(trigger) this.params = {trigger}
        return super.fetch(body)
    }
}
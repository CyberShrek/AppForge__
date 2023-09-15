import {JsonAccessor} from "./abstract/JsonAccessor";

export class FormStatementAccessor extends JsonAccessor<FormStatement> {

    override path: string
    constructor() {
        super()
        this.method = "POST"
        this.errorFooter = "Ошибка получения состояния формы"
    }

    override fetch(body?: any, triggerFieldKey?: string): Promise<FormStatement> {
        if(triggerFieldKey)
            this.headers = {"TriggerField": triggerFieldKey}

        return super.fetch(body)
    }
}
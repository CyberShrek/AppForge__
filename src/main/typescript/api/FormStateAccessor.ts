import {JsonAccessor} from "./abstract/JsonAccessor";
import {userInfo} from "../store/userInfo";

export class FormStateAccessor extends JsonAccessor<FormState> {

    private initial = true

    constructor(override path: string) {
        super()
        this.path = path
        this.method = "POST"
        this.errorFooter = "Ошибка получения состояния формы"
    }

    override fetch(body: any, trigger?: string): Promise<FormState> {
        if(this.initial) {
            trigger = "init"
            this.initial = false
        }

        this.params = trigger ? {trigger} : undefined

        return super.fetch({...body, userInfo})
    }
}
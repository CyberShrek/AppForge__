import {JsonAccessor} from "./abstract/JsonAccessor"

export class EndpointOptionsAccessor extends JsonAccessor<Options> {

    constructor(override path) {
        super()
        this.method = "POST"
        this.errorMessage = "Не удалось загрузить список опций"
    }
}
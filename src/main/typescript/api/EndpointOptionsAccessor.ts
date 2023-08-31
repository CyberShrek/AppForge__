import {Accessor} from "./Accessor"

export class EndpointOptionsAccessor extends Accessor<Options>{

    constructor(override path) {
        super()
        this.method = "POST"
        this.errorMessage = "Не удалось загрузить список опций"
    }

    override fetch(body?: any) {
        this.body = body
        return super.fetch()
    }
}
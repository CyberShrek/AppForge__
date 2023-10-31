import {JsonAccessor} from "./abstract/JsonAccessor"

export class OptionsAccessor extends JsonAccessor{

    method: "POST"

    constructor(public path: string) {
        super()

    }
}
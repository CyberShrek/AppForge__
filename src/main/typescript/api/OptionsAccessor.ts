import {JsonAccessor} from "./abstract/JsonAccessor"
import {jsonToMap} from "../util/data";

export class OptionsAccessor extends JsonAccessor{

    constructor(public path: string) {
        super()
        this.method = "POST"
        this.errorFooter = "Не удалось загрузить список опций"
    }

    override fetch(properties?: {[property: string]: any}): Promise<OptionsMap> {
        return super.fetch(properties).then(optionsJson => jsonToMap(optionsJson))
    }
}
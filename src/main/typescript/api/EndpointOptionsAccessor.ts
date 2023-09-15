import {JsonAccessor} from "./abstract/JsonAccessor"
import {Options} from "@rollup/plugin-terser";
import {jsonToMap} from "../util/data";

export class EndpointOptionsAccessor extends JsonAccessor {

    constructor(override path: string) {
        super()
        this.method = "POST"
        this.errorFooter = "Не удалось загрузить список опций"
    }

    override fetch(body?: any): Promise<any> {
        return super.fetch(body).then(json => jsonToMap(json))
    }
}
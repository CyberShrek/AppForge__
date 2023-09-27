import {TextAccessor} from "./abstract/TextAccessor"

export class StaticContent extends TextAccessor{
    constructor(override path: string) {
        super()
    }
}
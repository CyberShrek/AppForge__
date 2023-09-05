import {TextAccessor} from "./abstract/TextAccessor"

export class StaticContentAccessor extends TextAccessor{
    constructor(override path: string) {
        super()
    }
}
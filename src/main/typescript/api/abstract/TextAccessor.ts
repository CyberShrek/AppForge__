import {Accessor} from "./Accessor"

export abstract class TextAccessor extends Accessor<string>{

    protected override get request(): Promise<string> {
        return this.requestInit.text()
    }
}
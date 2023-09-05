import {Accessor} from "./Accessor"

export abstract class JsonAccessor<RESOURCE> extends Accessor<RESOURCE>{

     override get request(): Promise<RESOURCE> {
        return this.requestInit.json()
    }
}
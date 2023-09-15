import {Accessor} from "./Accessor"

export abstract class JsonAccessor<RESOURCE = any> extends Accessor<RESOURCE>{

     override get request(): Promise<RESOURCE> {
        return this.requestInit.text().then(text => {if(text) return JSON.parse(text)})
    }
}
import {Accessor} from "./Accessor"

export abstract class BlobAccessor extends Accessor<Blob>{

    protected override get request(): Promise<Blob> {
        return this.requestInit.blob()
    }
}
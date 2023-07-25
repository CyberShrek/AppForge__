import {InputFragment} from "./InputFragment"

export abstract class ExistedInputFragment<T> extends InputFragment<T>{
    protected constructor(core: HTMLElement) {
        super({target: core})
        this.core = core
    }
}
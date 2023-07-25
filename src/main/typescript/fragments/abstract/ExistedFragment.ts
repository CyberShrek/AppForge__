import {Fragment} from "./Fragment"

export abstract class ExistedFragment extends Fragment{
    protected constructor(core: HTMLElement) {
        super({target: core})
        this.core = core
    }
}
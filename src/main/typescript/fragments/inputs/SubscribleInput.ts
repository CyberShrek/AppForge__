import {Fragment} from "../Fragment"

export abstract class InputFragment<T> extends Fragment{

    value: T

    constructor(core: HTMLElement, location?: FragmentLocation) {
        super(core, location)
    }
}
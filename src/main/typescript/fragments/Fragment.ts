import {FragmentLocation} from "../entities/Fragment"

export abstract class Fragment {
    protected constructor(
        protected core: HTMLElement,
        protected location?: FragmentLocation,
        protected slot?: HTMLElement
    ) {
        if(location)
            (location.target instanceof Fragment
                ? location.target.slot!
                : location.target)
                .insertAdjacentElement(location.position ? location.position : "beforeend", core)
    }
}
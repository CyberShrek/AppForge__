export abstract class Fragment {
    protected constructor(
        protected readonly core: HTMLElement,
        protected readonly location?: FragmentLocation
    ) {
        if(location)
            (location.target instanceof Fragment
                ? location.target.core!
                : location.target)
                .insertAdjacentElement(location.position ? location.position : "beforeend", core)
    }
}
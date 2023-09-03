import {Fragment} from "../Fragment"

export class NavigationBody extends Fragment{

    constructor(...content: (Fragment | Element | string)[]) {
        super(`<div class="nav-body"></div>`)
        this.append(...content)
        this.hide()
    }
}
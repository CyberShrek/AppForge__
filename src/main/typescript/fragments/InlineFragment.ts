import {Fragment} from "./Fragment";

export abstract class InlineFragment<PARENT extends Fragment, T extends HTMLElement = HTMLElement> extends Fragment<T>{
    protected constructor(readonly parent: PARENT, root: string|T) {
        super(root)
        parent.append(this)
    }
}
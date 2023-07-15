import {Fragment} from "../fragments/Fragment"

export interface FragmentLocation{
    target: HTMLElement|Fragment,
    position?: InsertPosition
}
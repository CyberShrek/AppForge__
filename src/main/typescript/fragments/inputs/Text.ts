import {Fragment} from "../Fragment"
import {createElement} from "../../utils/DOMWizard"

export class Text extends Fragment{
    constructor(location: FragmentLocation, placeholder: string = "") {
        super(createElement("input", "",{type: "text"}, {placeholder}), location)

    }


}
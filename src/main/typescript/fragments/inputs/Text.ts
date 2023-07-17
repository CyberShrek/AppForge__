import {Fragment} from "../Fragment"
import {createElement} from "../../utils/domWizard"
import {FragmentLocation} from "../../entities/Fragment"
import {mapOf} from "../../utils/misc";

export class Text extends Fragment{
    constructor(location: FragmentLocation) {
        super(createElement("input", mapOf("": "")), location)
        this.core.setAttribute("type", "text")
    }
}
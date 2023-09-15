import {Fragment} from "../Fragment"
import {ForgedApplication} from "../applicatons/ForgedApplication"
import {scrollIntoElement} from "../../util/domWizard";
import Datepicker from "../inputs/Datepicker";

export class DemosBody extends Fragment{

    constructor() {
        super(`<div class="body"></div>`)
    }

    update() {
        this.root.innerHTML = ""
        new ForgedApplication(this.root)
        setTimeout(() => scrollIntoElement(this.root), 200)
    }
}
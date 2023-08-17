import {Fragment} from "../abstract/Fragment"
import {createDivElement, createElement} from "../../utils/DOMWizard"

export class Loader extends Fragment{

    constructor(location: FragmentLocation) {super(location)
        this.core = createDivElement({class: "loader"})
        this.core.insertAdjacentHTML("afterbegin",
            `<svg class="circular-loader" viewBox="25 25 50 50">
                <circle class="loader-path" cx="50" cy="50" r="20" fill="none"></circle>
            </svg>`)
    }
}
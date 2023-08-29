import {generateUniqueId} from "../../util/domWizard"
import {Fragment} from "../Fragment";

export default class Checkbox extends Fragment<HTMLDivElement>{

    private checkboxElement: HTMLInputElement

    constructor(label: string, onToggle: (checked: boolean) => void) {
        const id = generateUniqueId("checkbox")
        super(`
            <div class="checkbox">
                <input type="checkbox" id="${id}">
                <label for="${id}">${label}</label>
            </div>`
        )
        this.checkboxElement = this.select("input")
        this.listen("change", () => onToggle(this.checked))
    }

    get checked(): boolean{
        return this.checkboxElement.checked
    }
}
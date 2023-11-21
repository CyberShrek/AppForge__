import {Fragment} from "../Fragment"
import {valueOrDefault} from "../../util/data";

export default class Checkbox extends Fragment<HTMLLabelElement>{

    private checkboxElement: HTMLInputElement

    constructor(config: CheckboxConfig, onToggle: (checked: boolean) => void) {
        super(`
            <label class="checkbox">
                <input type="checkbox">
                ${valueOrDefault(config.title, "")}
            </label>`
        )
        this.checkboxElement = this.select("input")
        this.listen("change", () => onToggle(this.checked))
    }

    get checked(): boolean{
        return this.checkboxElement.checked
    }

}
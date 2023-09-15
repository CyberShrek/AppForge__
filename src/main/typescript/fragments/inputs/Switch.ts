import Checkbox from "./Checkbox"
import {create} from "../../util/domWizard";

// Almost the same as Checkbox
export class Switch extends Checkbox{

    constructor(config: SwitchConfig, onToggle: (checked: boolean) => void) {
        super(config, onToggle)
        this.className = "switch"
        this.append(create(`<span class="slider"></span>`))
    }
}
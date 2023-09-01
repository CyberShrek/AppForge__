import Checkbox from "./Checkbox"

// Almost the same as Checkbox
export class Switch extends Checkbox{

    constructor(config: SwitchConfig, onToggle: (checked: boolean) => void) {
        super(config, onToggle)
        this.className = "switch"
    }
}
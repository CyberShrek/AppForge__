import {resolveCSS} from "../../utils/resolver"
import {Button} from "../inputs/Button"
import {InputFragment} from "../abstract/InputFragment"
import {Text} from "../inputs/Text"
import {numberOf} from "../../utils/misc";
import {DateField} from "./section/fields/DateField";
import {CheckboxField} from "./section/fields/CheckboxField";
import {SelectField} from "./section/fields/SelectField";

resolveCSS("main-form")

export default class MainForm extends InputFragment<MainFormValues>{

    readonly confirmButton: Button

    constructor(location: FragmentLocation) {
        super(location)
        this.core = location.target
        this.value = {}
        this.activateFields()
        this.confirmButton = new Button({target: this.core, position: "afterend"})
        this.confirmButton.addClass("confirm")
    }

    private fields: Map<string, InputFragment<any>> = new Map()

    private activateFields(){
        this.core.querySelectorAll(".section").forEach(sectionElement => {
            const sectionKey = sectionElement.getAttribute("key")
            sectionElement.querySelectorAll(".field").forEach(fieldElement => {
                const fieldKey = fieldElement.getAttribute("key")
                this.fields.set(`${sectionKey}.${fieldKey}`, this.resolveField(fieldElement as HTMLElement))
            })
        })
    }

    private resolveField(fieldElement: HTMLElement): InputFragment<any>{
        const containsClass = (className: string) => fieldElement.classList.contains(className)
        const location: FragmentLocation = {target: fieldElement}
        const configElement: HTMLElement = fieldElement.querySelector("config")
        return containsClass("datepicker") ? new DateField(location, configElement)
            : containsClass("checkbox") ? new CheckboxField(location, configElement)
                : containsClass("select") ? new SelectField(location, configElement)
                    : new Text(location)
    }
}
import {resolveCSS} from "../../utils/resolver"
import {Button} from "../inputs/Button"
import {InputFragment} from "../abstract/InputFragment"
import Date from "../inputs/Date"
import CheckBox from "../inputs/CheckBox"
import Select from "../inputs/Select"
import {Text} from "../inputs/Text"
import {numberOf} from "../../utils/misc";

resolveCSS("main-form")

export default class MainForm extends InputFragment<MainFormValues>{

    confirmButton: Button

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
        return containsClass("datepicker") ? new Date(location, resolveDatepickerConfig(fieldElement))
            : containsClass("checkbox") ? new CheckBox(location)
                : containsClass("select") ? new Select(location, resolveSelectConfig(fieldElement))
                    : new Text(location)
    }


    // getValues(): MainFormValues {
    //     const values = {}
    //     this.sections.forEach((section, sectionKey) => {
    //         section.fields.forEach((field, fieldKey) => {
    //             if(!!field.value)
    //                 values[`${sectionKey}.${fieldKey}`] = field.value
    //         })
    //     })
    //     return values
    // }
}

function resolveDatepickerConfig(fieldElement: HTMLElement): DatepickerInputConfig{
    return {
        maxDays: numberOf(fieldElement.querySelector("config").getAttribute("max-days"))
    }
}

function resolveSelectConfig(fieldElement: HTMLElement): SelectInputConfig{
    const config = fieldElement.querySelector("config")
}

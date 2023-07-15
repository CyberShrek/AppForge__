import {Field} from "./Field"
import {Section} from "../Section"

export default class CheckBox extends Field{

    value: boolean

    constructor(core: HTMLElement,
                public section: Section) { super(core, section)

        section.form.onMount(() => {
            this.interceptStandardCheckbox()
        })
    }

    private interceptStandardCheckbox(){
        const updateValue=(value) => {
            this.value = value
            this.dispatchUpdate()
        }

        this.core.querySelector('input[type="checkbox"]').addEventListener('change', function() {
            updateValue(this.checked)
        });
    }
}
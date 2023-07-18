import {Section} from "./section/Section"
import {Fragment} from "../core/Fragment"

export abstract class Form extends Fragment{

    sections: Map<SectionKey, Section> = new Map()

    private onMountExecutionList: (() => void)[] = []

    protected constructor(core: HTMLFormElement) {super(core)}

    onMount(execute: () => void){
        this.onMountExecutionList.push(execute)
    }

    getValues(): object {
        const values = {}
        this.sections.forEach((section, sectionKey) => {
            section.fields.forEach((field, fieldKey) => {
                if(field.value)
                    values[`${sectionKey}.${fieldKey}`] = field.value
            })
        })
        return values
    }

    protected mount(){
        this.onMountExecutionList.forEach(execute => execute())
        this.onMountExecutionList = null
    }
}
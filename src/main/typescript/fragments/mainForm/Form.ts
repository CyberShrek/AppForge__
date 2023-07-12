import {Section} from "./section/Section"

export class Form implements Fragment{

    sections: Map<SectionKey, Section> = new Map()

    private onMountExecutesList: (() => void)[] = []

    protected constructor(public core: HTMLFormElement) {}

    onMount(execute: () => void){
        this.onMountExecutesList.push(execute)
    }

    protected mount = () => {
        this.onMountExecutesList.forEach(execute => execute())
        this.onMountExecutesList = null
    }
}
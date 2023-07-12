import {Section} from "./section/Section"

export class Form implements Fragment{

    sections: Map<SectionKey, Section> = new Map()

    protected constructor(public core: HTMLFormElement) {}

    onMount: () => void

    protected mount = () => this.onMount()
}
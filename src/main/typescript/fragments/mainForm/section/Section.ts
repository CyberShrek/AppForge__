import {Fragment} from "../../abstract/Fragment"
import {Field} from "./fields/Field"

export class Section extends Fragment{

    fields: Map<string, Field>

    constructor(location: FragmentLocation) {
        super(location)
        this.core = location.target
        // core.querySelectorAll<HTMLElement>(".field").forEach(fieldElement =>
        //     this.fields.set(
        //         fieldElement.getAttribute("key"),
        //         this.defineField(fieldElement)
        //     )
        // )
    }

    // private defineField(fieldCore: HTMLElement): Field{
    //     if(fieldCore.classList.contains("datepicker")) return new Date(fieldCore, this)
    //     if(fieldCore.classList.contains("select")) return new Select(fieldCore, this)
    //     if(fieldCore.classList.contains("checkbox")) return new Checkbox(fieldCore, this)
    // }
}
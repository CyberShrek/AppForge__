import {Fragment} from "../Fragment"
import {resolveCSS} from "../../util/resolver"
import Select from "../inputs/Select"
import {ForgedApplication} from "./ForgedApplication"

resolveCSS("third-party/github-markdown")

export class IndexApplication extends Fragment{


    constructor() {
        super(document.body)

        const selectOfDemos = new Select({}, () => {})
        selectOfDemos.options = new Map([["Простая форма", "1"], ["Комплексная форма", "2"], ["ввв", "3"]])
        this.append(selectOfDemos)
        if(false)
            new ForgedApplication(document.body.querySelector("div.demos-body"))
    }
}
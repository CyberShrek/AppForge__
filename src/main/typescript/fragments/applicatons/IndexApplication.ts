import {Fragment} from "../Fragment"
import {resolveStyle} from "../../util/resolver"
import {ForgedApplication} from "./ForgedApplication"
import {Demos} from "../demo/Demos"

resolveStyle("index")
resolveStyle("third-party/github-markdown")

export class IndexApplication extends Fragment{

    constructor() {
        super(document.body)
        this.append(new Demos())

        if(false)
            new ForgedApplication(document.body.querySelector("div.demos-body"))
    }
}
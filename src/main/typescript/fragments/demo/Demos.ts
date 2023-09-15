import {Fragment} from "../Fragment"
import {DemosHead} from "./DemosHead"
import {setAppConfig} from "../../store/appConfig"
import {DemosBody} from "./DemosBody";

export class Demos extends Fragment{

    constructor() {
        super(`<div id="demos"></div>`)

        const head = new DemosHead(config => {
            setAppConfig(config)
            body.update()
        })
        const body = new DemosBody()

        this.append(head, body)
    }
}
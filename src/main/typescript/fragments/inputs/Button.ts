import {createButton} from "../../utils/DOMWizard"
import {Fragment} from "../Fragment"

export class Button extends Fragment {

    constructor(location: FragmentLocation, text?: string, image?: string) {
        super(createButton())
        this.core.textContent = text
        location.target.insertAdjacentElement(location.position, this.core)
        this.interceptStandardClick()
    }

    private onClickExecutionList: (() => void)[] = []
    onClick(execute: () => void){
        this.onClickExecutionList.push(execute)
    }

    private interceptStandardClick(){
        this.core.addEventListener("click", () => {
            this.onClickExecutionList?.forEach(execute => execute())
        })
    }
}
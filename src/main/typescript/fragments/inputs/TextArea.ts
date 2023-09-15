import {Fragment} from "../Fragment"

export class TextArea extends Fragment{

    constructor() {
        super(`<div class="textarea" contentEditable spellcheck="false"></div>`)
        this.listen("keydown", (event: KeyboardEvent) => {
            if(event.key === "Tab"){
                event.preventDefault()
                this.insertTab()
            }
        })
    }

    get text(): string{
        return this.root.textContent
    }
    set text(str: string){
        this.root.textContent = str
    }

    private insertTab(){
        if (getSelection) {
            const selection = getSelection()
            if (selection.getRangeAt && selection.rangeCount) {
                const range = selection.getRangeAt(0)
                range.deleteContents()
                range.insertNode(document.createTextNode("    "))
                selection.collapseToEnd()
            }
        }
    }
}
import {Fragment} from "../Fragment"

export class TextArea extends Fragment{

    private shiftIsPressed = false

    constructor() {
        super(`<div class="textarea" contentEditable spellcheck="false"></div>`)
        this.listen("keydown", (event: KeyboardEvent) => {
            if(event.key === "Tab"){
                event.preventDefault()
                this.insertTab()
            }
            if(event.key === "Shift"){
                this.shiftIsPressed = true
            }
        })
        this.listen("keyup", (event: KeyboardEvent) => {
            if(event.key === "Shift"){
                this.shiftIsPressed = true
            }
        })
    }

    onInputEnter(callback: (text: string) => void){
        this.listen("focusout", () => callback(this.text))
        this.listen("keydown", (event: KeyboardEvent) => {
            if(event.key === "Enter" && this.shiftIsPressed){
                // Removing the new line
                this.text = this.text.trimEnd()
                this.root.blur()
            }
        })
    }

    get text(): string{
        return this.root.innerText
    }
    set text(str: string){
        this.root.innerText = str
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
import {Fragment} from "../Fragment"
import {Button} from "./Button"

export class TextInput extends Fragment{

    private textInputElement: HTMLInputElement

    constructor(placeholder: string, onInput: (text: string) => void) {
        super(`
            <div class="text input">
                <input type="text" placeholder="${placeholder}">
            <div/>
        `)
        this.append(new Button({
            className: "frameless reset",
            text: "❌",
            hint: "Сбросить"
        }, () => this.text = ""))

        this.textInputElement = this.select("input")

        this.listen("input", () => {
            this.toggleClass("empty", !this.text || this.text.length === 0)
            if(onInput) onInput(this.text)
        })
    }

    get text(): string{
        return this.textInputElement.value
    }
    set text(str: string){
        this.textInputElement.value = str
    }
}
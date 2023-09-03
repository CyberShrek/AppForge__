import {Fragment} from "../Fragment"
import {Button} from "../inputs/Button"

export class NavigationBar extends Fragment{

    private tabButtons = new Map<string, Button>()

    constructor(tabs?: {[text: string]: () => void}) {
        super(`<div class="nav-bar"></div>`)

        if(tabs)
            Object.entries(tabs).forEach(entry => {
                this.add(entry[0], entry[1])
            })
    }

    add(tabName: string, tabAction: () => void){
        const tabButton = new Button({
            className: "tab",
            text: tabName
        }, () => {
            tabAction()
            this.pick(tabName)
        })
        this.tabButtons.set(tabName, tabButton)
        this.append(tabButton)
    }

    pick(tabName){
        this.tabButtons.forEach((button, name) => {
            button.removeClass("active")
            if(name === tabName)
                button.addClass("active")
        })
    }
}
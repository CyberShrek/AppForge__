import {Fragment} from "../Fragment"
import {Button} from "../inputs/Button"

export class NavigationBar extends Fragment{

    private tabButtons = new Map<string, Button>()
    private tabActions = new Map<string, () => void>()

    constructor(tabs?: {[text: string]: () => void}) {
        super(`<div class="nav-bar"></div>`)

        if(tabs)
            Object.entries(tabs).forEach(entry => {
                this.add(entry[0], entry[1])
            })
    }

    add(tabTitle: string, onPick: () => void){
        const tabAction = () => {
            onPick()
            this.tabButtons.forEach((button, name) => {
                button.removeClass("active")
                if(name === tabTitle)
                    button.addClass("active")
            })
        }
        const tabButton = new Button({
            className: "tab",
            text: tabTitle
        }, () => tabAction())
        this.tabButtons.set(tabTitle, tabButton)
        this.tabActions.set(tabTitle, tabAction)
        this.append(tabButton)
    }

    pick(tabTitle: string){
        this.tabActions.get(tabTitle)()
    }
}
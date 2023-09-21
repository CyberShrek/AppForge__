import {Fragment} from "../Fragment"
import {NavigationBar} from "./NavigationBar"
import {NavigationBody} from "./NavigationBody"

export class NavigationContainer extends Fragment{

    private readonly naviBar = new NavigationBar()
    private readonly naviBodies: NavigationBody[] = []

    constructor() {
        super(`<div class="nav-container"></div>`)
        this.append(this.naviBar)
    }

    createTab(tabTitle: string, onPick?: () => void, ...content: (Fragment | Element | string)[]){
        const naviBody = new NavigationBody(...content)
        this.naviBodies.push(naviBody)
        this.append(naviBody)
        this.naviBar.add(tabTitle,
            () => {
                this.naviBodies.forEach(body => body.hide())
                naviBody.show()
                onPick()
            })
    }

    pickTab(tabTitle: string){
        this.naviBar.pick(tabTitle)
    }
}
import {Fragment} from "../Fragment"
import {NavigationBar} from "./NavigationBar"
import {NavigationBody} from "./NavigationBody"

export class NavigationContainer extends Fragment{

    private readonly naviBar = new NavigationBar()
    private readonly naviBodies: NavigationBody[] = []

    constructor(tabs?: {[name: string]: (Fragment | Element | string)[]}) {
        super(`<div class="nav-container"></div>`)
        this.append(this.naviBar)

        if(tabs)
            Object.entries(tabs).forEach(entry => this.createTab(entry[0], ...entry[1]))
    }

    createTab(tabName: string, ...content: (Fragment | Element | string)[]){
        const naviBody = new NavigationBody(...content)
        this.naviBodies.push(naviBody)
        this.append(naviBody)
        this.naviBar.add(tabName,
            () => {
                this.naviBodies.forEach(body => body.hide())
                naviBody.show()
            })
    }

    pickTab(tabName: string){
        this.naviBar.pick(tabName)
    }
}
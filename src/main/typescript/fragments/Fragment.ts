import {create} from "../util/domWizard"

export abstract class Fragment<T extends HTMLElement> {

    protected root: T

    protected constructor(root: string|T) {
        this.root = root instanceof HTMLElement ? root : create(root)
    }

    // Inserts elements into "slot" tag. Or into root if there are no slots
    append(...items: (Fragment<HTMLElement> | Element | string)[]){
        let target: HTMLElement = this.root.querySelector("slot")
        if(!target)
            target = this.root

        items.forEach(item =>
            this.root.append((item instanceof Fragment) ? item.root : item)
        )
    }

    select<T extends HTMLElement>(selectors: string){
        return this.root.querySelector<T>(selectors)
    }
    selectAll<T extends HTMLElement>(selectors: string){
        return this.root.querySelectorAll<T>(selectors)
    }

    hide(){
        this.root.style.display = "none"
    }

    show(){
        this.root.style.display = ""
    }

    remove(){
        this.root.remove()
    }

    addClass(tokens: string){
        this.root.classList.add(tokens)
    }
    removeClass(tokens: string){
        this.root.classList.remove(tokens)
    }
    toggleClass(tokens: string){
        this.root.classList.toggle(tokens)
    }
    hasClass(token: string): boolean{
        return this.root.classList.contains(token)
    }
    set className(className: string){
        this.root.className = className
    }
    get className(){
        return this.root.className
    }
}

export interface Trigger {
    subscribe(callback: (value?: any) => void)
}
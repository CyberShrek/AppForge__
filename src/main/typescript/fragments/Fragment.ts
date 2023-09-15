import {create} from "../util/domWizard"

export abstract class Fragment<T extends HTMLElement = HTMLElement> {

    root: T

    protected constructor(root: string|T) {
        this.root = root instanceof HTMLElement ? root : create(root)
    }

    append(...items: (Fragment | Element | string)[]){
        items.forEach(item =>
            this.root.append((item instanceof Fragment) ? item.root :
                item)
        )
    }

    select<T extends HTMLElement>(selectors: string){
        return this.root.querySelector<T>(selectors)
    }
    selectAll<T extends HTMLElement>(selectors: string){
        return this.root.querySelectorAll<T>(selectors)
    }

    get hidden() {
        return !!this.root.hidden
    }

    hide(){
        this.root.style.display = "none"
        this.root.hidden = true
    }
    show(){
        this.root.style.display = ""
        this.root.hidden = false
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
    toggleClass(tokens: string, force?: boolean){
        this.root.classList.toggle(tokens, force)
    }
    hasClass(token: string): boolean{
        return this.root.classList.contains(token)
    }
    set className(className: string){
        if(!!className)
            this.root.className = className
    }
    get className(){
        return this.root.className
    }

    listen(event: keyof HTMLElementEventMap, onEvent: (event?: Event) => void){
        this.root.addEventListener(event, onEvent)
    }

    onMount(callback: () => void) {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.target === this.root || mutation.target.contains(this.root)) {
                    callback()
                    observer.disconnect()
                    break
                }
            }
        })
        observer.observe(document.documentElement, { childList: true, subtree: true })
    }
}
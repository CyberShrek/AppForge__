import {buildLocatedElement} from "../../utils/elementBuilder"

const updatingEvent = new Event("update")

export abstract class Component {
    private readonly core: HTMLElement

    protected constructor(
        core: HTMLElement|LocatedElementOptions
    ) {
        this.core = core instanceof HTMLElement ? core : buildLocatedElement(core.location, core)
        this.core.addEventListener(updatingEvent.type, () => this.update())
        this.onMount(this.core)
    }

    // Used in the listen() method
    private eventCallbacks: Map<keyof HTMLElementEventMap, ((event?: Event) => void)> = new Map()

    // Works like addEventListener() but each new event listener with the same event type removes the previous listener.
    // That means there can be the only one callback for each event type.
    listen(event: keyof HTMLElementEventMap,
           callback?: (event?: Event) => void){
        if(this.eventCallbacks[event] === callback)
            this.core.removeEventListener(event, callback)
        else this.eventCallbacks[event] = callback
        if(callback !== null)
            this.core.addEventListener(event, callback)
    }

    addClass    = (className: string) => this.core.classList.add(className)
    removeClass = (className: string) => this.core.classList.remove(className)
    toggleClass = (className: string) => this.core.classList.toggle(className)

    update() {
        this.beforeUpdate(this.core)
        // TODO
        this.afterUpdate(this.core)
    }

    insert(child: Component, slotName?: string){
        // TODO
    }

    destroy() {
        this.onDestroy(this.core)
        this.core.remove()
    }

    // Life cycle callbacks
    protected onMount: (core?: HTMLElement) => void
    protected beforeUpdate: (core?: HTMLElement) => void
    protected afterUpdate: (core?: HTMLElement) => void
    protected onDestroy: (core?: HTMLElement) => void
}
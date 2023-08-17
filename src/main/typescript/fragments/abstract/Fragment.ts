export abstract class Fragment {

    private coreElement: HTMLElement
    private insertCallback: (() => void)|void

    protected set core(element: HTMLElement){
        if(!this.coreElement){
            this.coreElement = element
            this.insertCallback = !!this.insertCallback ? this.insertCallback() : null
        }
        else throw new Error("The core cannot be reassigned")
    }
    get core(): typeof this.coreElement{
        return this.coreElement
    }

    protected constructor(location: FragmentLocation) {
        this.insertCallback = () => {
            if(!!location.position)
                location.target.insertAdjacentElement(location.position, this.coreElement)
            else
                location.target.replaceWith(this.coreElement)
        }
    }

    set class(className: string){
        this.core.className = className
    }
    get class(): string{
        return this.core.className
    }
    addClass   =(className: string) => this.core.classList.add(className)
    removeClass=(className: string) => this.core.classList.remove(className)
    toggleClass=(className: string) => this.core.classList.toggle(className)

    hide(){
        this.core.style.display = "none"
    }

    show(){
        this.core.style.display = ""
    }

    remove(){
        this.core.remove()
    }
}
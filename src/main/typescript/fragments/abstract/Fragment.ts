export abstract class Fragment {

    protected constructor(
        readonly root: HTMLElement
    ) {}

    append(...items: (Fragment | Element)[]){
        items.forEach(item =>
            this.root.appendChild((item instanceof Fragment) ? item.root : item)
        )
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
}
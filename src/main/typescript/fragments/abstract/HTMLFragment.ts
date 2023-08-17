export abstract class HTMLFragment<ElementType extends HTMLElement> {

     // Simple html string for the core element
     protected readonly _html: string


     // The core element
     // @ts-ignore
     readonly element: ElementType = document.createElement("p")

     constructor(protected options?: FragmentOptions) {}

     render(){
          this.element.innerHTML = this.html
          this.onRender()
     }

     protected abstract get html(): string

     protected onRender = () => {}
}

export abstract class Factory{
     static create(fragmentClass: new(options?: FragmentOptions) => HTMLFragment<any>, options?: FragmentOptions){
          const frag = new fragmentClass(options)
          frag.render()
          return frag
     }
}
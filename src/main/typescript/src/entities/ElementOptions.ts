interface ElementLocation{
    target: HTMLElement
    position: InsertPosition
}

interface LocatedElementOptions extends ElementOptions{
    location: ElementLocation
}

interface ElementOptions {
    tag: string
    id?: string
    class?: string
    siblings?: Array<ElementOptions>
}
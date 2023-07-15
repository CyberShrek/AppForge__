export function createElement<T extends HTMLElement>(tagName: string, classes?: string, attributes?: Map<string, string>): T{
    const element = document.createElement(tagName) as T
    if(classes) element.className = classes
    attributes?.forEach(attributeEntry => element.setAttribute(attributeEntry[0], attributeEntry[1]))
    return element
}


export function createButton(classes?: string, attributes?: Map<string, string>): HTMLButtonElement{
    return createElement("button", classes, attributes) as HTMLButtonElement
}

// Removes all child elements
export function emptyElement(element: Element){
    while(element.firstElementChild !== null)
        element.firstElementChild.remove()
}
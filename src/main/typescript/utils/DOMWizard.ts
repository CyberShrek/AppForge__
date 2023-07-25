// Returns created element with specific tag name and attributes
export function createElement<T extends HTMLElement>(tagName: string, textContent: string = "", ...attributes: Attribute[]): T{
    const element = document.createElement(tagName) as T
    if(textContent) element.textContent = textContent
    attributes?.forEach(attribute =>
        element.setAttribute(
            Object.keys(attribute)[0],
            String(Object.values(attribute)[0])
        )
    )
    return element
}

export function createDivElement(...attributes: Attribute[]): HTMLDivElement{
    return createElement("div", "", ...attributes)
}

export function createButtonElement(textContent: string = "", ...attributes: Attribute[]): HTMLButtonElement{
    return createElement("button", textContent, ...attributes)
}

export function createInputElement(type: string, ...attributes: Attribute[]): HTMLInputElement{
    return createElement("input", "", {type}, ...attributes)
}

export function createLabelElement(textContent: string = "", ...attributes: Attribute[]): HTMLLabelElement{
    return createElement("label", textContent, ...attributes)
}

export function createImageElement(src: string = "", alt: string = "not found", ...attributes: Attribute[]): HTMLImageElement{
    return createElement("img", "", {src}, ...attributes)
}

// Removes all child elements
export function emptyElement(element: Element, withText: boolean = true){
    const text = element.textContent
    while(element.firstElementChild !== null)
        element.firstElementChild.remove()

    if(!withText) element.textContent = text
}

// Returns startName with serial number
export function generateUniqueId(startName: string = "element"){
    let serialNumber = -1,
        name: string

    do name = startName +"-"+ serialNumber++
    while (document.getElementById(name) !== null)

    return name
}
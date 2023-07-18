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

// Removes all child elements
export function emptyElement(element: Element){
    while(element.firstElementChild !== null)
        element.firstElementChild.remove()
}
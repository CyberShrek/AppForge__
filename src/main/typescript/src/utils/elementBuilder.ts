export function buildLocatedElement(location: ElementLocation, options: ElementOptions){
    const element = buildElement(options)
    location.target.insertAdjacentElement(location.position, element)
    return element
}

export function buildElement(options: ElementOptions): HTMLElement{
    const element = document.createElement(options.tag)
    element.id = options.id
    element.classList.add(options.class)
    options.siblings.forEach(siblingOption => element.appendChild(buildElement(siblingOption)))
    return element
}
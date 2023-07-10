// export function createLocatedElement(location: , options: ElementOptions){
//     const element = createElement(options)
//     location.target.insertAdjacentElement(location.position, element)
//     return element
// }

export function createElement(html: string): HTMLElement{
    const element = document.createElement("div")
    element.outerHTML = html
    return element
}

// export function createHtml(options: ElementOptions): string{
//     const createAttributeOrNone = (key: string, value: string|undefined): string => value ? `${key}="${value}"` : "",
//         tag = options.tag,
//         attributes = [
//             createAttributeOrNone("id", options.id),
//             createAttributeOrNone("class", options.class),
//             [options.attributes.entries()].map(entry => createAttributeOrNone(entry[0], entry[1]))
//         ].join(" "),
//         siblings = options.content?.map(sibling =>
//             typeof sibling === "string" ? sibling : createHtml(sibling)
//         ).join("") || ""
//
//     return `<${tag} ${attributes}>${siblings}</${tag}>`
// }
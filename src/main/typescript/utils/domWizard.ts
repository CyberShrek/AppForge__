export function createElement(html: string): HTMLElement{
    const element = document.createElement("div")
    element.outerHTML = html
    return element
}
export function resolveCSS(name: string){
    const source = `./css/${name}.css`
    const headElement = document.querySelector("head")
    if(headElement.querySelector(`link[href="${source}"]`) === null) {
        const styleEl = document.createElement("link")
        styleEl.setAttribute("rel", "stylesheet")
        styleEl.setAttribute("href", source)
        headElement.appendChild(styleEl)
    }
}
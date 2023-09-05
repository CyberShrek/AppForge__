export function resolveCSS(name: string){
    const source = `/appforge/css/${name}.css`
    const headElement = document.querySelector("head")
    if(headElement.querySelector(`link[href="${source}"]`) === null) {
        const styleEl = document.createElement("link")
        styleEl.setAttribute("rel", "stylesheet")
        styleEl.setAttribute("href", source)
        headElement.appendChild(styleEl)
    }
}

export function resolveJS(name: string) {
    return import(`/appforge/js/${name}.js`)
}
    // document.body.insertAdjacentHTML("beforeend",
    //     `<script type="module" src="/appforge/js/${name}.js"></script>`)

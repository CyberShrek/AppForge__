const resolvedCssNames = new Set<string>()

export function resolveCSS(name: string){
    if(resolvedCssNames.has(name))
        return Promise.resolve()

    resolvedCssNames.add(name)
    return new Promise((resolve, reject) => {
        const link = document.createElement('link')
        link.rel     = 'stylesheet'
        link.href    = `/appforge/css/${name}.css`
        link.onload  = resolve
        link.onerror = reject
        document.head.appendChild(link)
    })
}

export function resolveJS(name: string) {
    return import(`/appforge/js/${name}.js`)
}
    // document.body.insertAdjacentHTML("beforeend",
    //     `<script type="module" src="/appforge/js/${name}.js"></script>`)

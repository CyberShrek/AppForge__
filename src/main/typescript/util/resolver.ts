import {modulesLocation, stylesLocation} from "../properties";

const
    stylesPromises  = new Map<string, Promise<any>>(),
    modulesPromises = new Map<string, Promise<any>>()

export const resolveStyle = (name: string) =>
    promisePromise(name, stylesPromises, new Promise((resolve, reject) => {
        const link = document.createElement('link')
        link.rel     = 'stylesheet'
        link.href    = `${stylesLocation}${name}.css`
        link.onload  = resolve
        link.onerror = reject
        document.head.appendChild(link)
    }))

export const resolveModule = (name: string) =>
    promisePromise(name, modulesPromises, import(`${modulesLocation}${name}.js`))


function promisePromise<T>(promiseName: string,
                           promiseContainer: Map<string, Promise<any>>,
                           promise: Promise<T>): Promise<T>{

    if(!promiseContainer.has(promiseName))
        promiseContainer.set(promiseName, promise)

    return promiseContainer.get(promiseName)
}
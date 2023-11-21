import wretch from "wretch"
import {jsonify, jsonToMap, mapToJson} from "../../util/data"
import {removeCursorLoader, addCursorLoader} from "../../util/domWizard"
import {popupHttpDataError} from "../../util/alert"


export abstract class Accessor<RESOURCE> {

    abstract path: string
    method: "GET" | "POST" = "GET"
    params: Map<string, string> | {[param: string] : string}
    headers: Map<string, string> | {[header: string] : string}
    body: any
    errorFooter: string = "Ошибка получения ресурса"


    async fetch(body?: object): Promise<RESOURCE> {
        await this.lastPromise
        addCursorLoader()
        if(body) this.body = body
        return this.lastPromise = this.request
            .catch((error: Error) => {
                popupHttpDataError(error, this.errorFooter).then(() => location.reload())
            })
            .finally(() => removeCursorLoader())
            .then(entity => {
                if (entity) return entity as RESOURCE
            })
    }

    protected get requestInit(){
        const requestInit = wretch(this.path + (this.params ? "?" + Object.entries(jsonify(this.params)).map(entry => entry[0]+"="+entry[1]).join("&") : ""))
            .headers({
                "Content-Type": "application/json;charset=UTF-8",
                ...jsonify(this.headers)
            })
            .body(this.body ? JSON.stringify(this.body) : undefined)

        return (this.method === "GET" ? requestInit.get() : requestInit.post())
    }

    protected abstract get request(): Promise<RESOURCE>

    private lastPromise: Promise<RESOURCE>
}
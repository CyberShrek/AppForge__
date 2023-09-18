import wretch from "wretch"
import {jsonify, jsonToMap, mapToJson} from "../../util/data"
import {removeCursorLoader, addCursorLoader} from "../../util/domWizard"
import {popupHttpDataError} from "../../util/modal"


export abstract class Accessor<RESOURCE> {

    abstract path: string
    method: "GET" | "POST" = "GET"
    params: Map<string, string> | {[param: string] : string}
    headers: Map<string, string> | {[header: string] : string}
    body: any
    errorFooter: string = "Ошибка получения ресурса"


    fetch(body?: any): Promise<RESOURCE> {
        addCursorLoader()
        if(body) this.body = body
        return this.request
            .catch((error: Error) => popupHttpDataError(error, this.errorFooter))
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
}
import wretch from "wretch"
import {jsonify, mapToJson} from "../../util/data"
import {removeCursorLoader, addCursorLoader} from "../../util/domWizard"
import {popupHttpDataError} from "../../util/modal";
import {blob, text} from "stream/consumers";


export abstract class Accessor<RESOURCE> {

    abstract path: string
    method: "GET" | "POST" = "GET"
    headers: Map<string, string> | {[header: string] : string}
    body: any
    errorMessage: string = "Ошибка получения ресурса"


    fetch(body?: any): Promise<RESOURCE> {
        addCursorLoader()
        if(body) this.body = body
        return this.request
            .catch(error => popupHttpDataError(error, this.errorMessage))
            .finally(() => removeCursorLoader())
            .then(entity => {
                if (entity) return entity as RESOURCE
            })
    }

    protected get requestInit(){
        const requestInit = wretch(this.path)
            .headers(jsonify(this.headers))
            .body(this.body)

        return (this.method === "GET" ? requestInit.get() : requestInit.post())
    }

    protected abstract get request(): Promise<RESOURCE>
}
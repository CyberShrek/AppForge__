import wretch from "wretch"
import {mapToJson} from "../../util/data"
import {setCursorToDefault, setCursorToLoading} from "../../util/domWizard"
import {popupHttpDataError} from "../../util/modal";

export abstract class Accessor<RESOURCE> {

    abstract path: string
    method: "GET" | "POST" = "GET"
    headers: Map<string, string>
    body: any
    errorMessage: string = "Ошибка получения ресурса"

    fetch(): Promise<RESOURCE | void> {
        setCursorToLoading()

        const requestInit = wretch(this.path)
            .headers(mapToJson(this.headers))
            .body(this.body);

        return (this.method === "GET" ? requestInit.get() : requestInit.post())
            .json((resource: RESOURCE) => resource)
            .catch(error => popupHttpDataError(error, this.errorMessage))
            .finally(() => setCursorToDefault())
    }
}
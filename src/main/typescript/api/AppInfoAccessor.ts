import {appConfig} from "../store/appConfig"
import {JsonAccessor} from "./abstract/JsonAccessor"
import {valueOrDefault} from "../util/data"

export class AppInfoAccessor extends JsonAccessor<AppInfo>{
    override path = "/appforge/info"
    override errorFooter = "Не удалось загрузить информацию о приложении"

    constructor() {
        super()
        this.headers = {Code: valueOrDefault(appConfig.code, "")}
    }
}
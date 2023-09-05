import {appConfig} from "../store/appConfig"
import {JsonAccessor} from "./abstract/JsonAccessor";

export class AppInfoAccessor extends JsonAccessor<AppInfo>{
    override path = "info"
    override headers = { Code: appConfig.code }
    override errorMessage = "Не удалось загрузить информацию о приложении"
}
import {Accessor} from "./Accessor"
import {appConfig} from "../store/appConfig"

export class AppInfoAccessor extends Accessor<AppInfo>{
    override path = "info"
    override headers = { Code: appConfig.code }
    override errorMessage = "Не удалось загрузить информацию о приложении"
}
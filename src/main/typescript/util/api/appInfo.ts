import wretch from "wretch"
import {appConfig} from "../../store/appConfig"

export function fetchAppInfo(): Promise<AppInfo>{
    return wretch("info")
        .headers({"Code": appConfig.code})
        .get()
        .json((appInfo: AppInfo) => appInfo)
}
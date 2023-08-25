import wretch from "wretch"
import {appConfig} from "../../store/appConfig";

export function fetchAppInfo(): Promise<AppInfo>{
    return wretch("appInfo")
        .headers({"Code": appConfig.code})
        .get()
        .json((appInfo: AppInfo) => appInfo)
}
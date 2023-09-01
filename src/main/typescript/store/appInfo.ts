import {fetchAppInfo} from "../api/appInfo"

export const appInfoPromise: Promise<AppInfo> = fetchAppInfo()
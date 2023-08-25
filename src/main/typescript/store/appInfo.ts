import {fetchAppInfo} from "../util/api/appInfo"

export const appInfoPromise: Promise<AppInfo> = fetchAppInfo()
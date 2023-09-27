import {AppInfoAccessor} from "../api/AppInfoAccessor"

export let appInfo: AppInfo = {} as AppInfo
export async function retrieveAppInfo(): Promise<AppInfo> {
    return appInfo = await new AppInfoAccessor().fetch()
}
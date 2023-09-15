import {AppInfoAccessor} from "../api/AppInfoAccessor"

export let appInfoPromise: Promise<AppInfo>

const accessor = new AppInfoAccessor()

export function retrieveAppInfo(){
    appInfoPromise = accessor.fetch()
}
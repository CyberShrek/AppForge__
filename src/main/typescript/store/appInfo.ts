import {AppInfoAccessor} from "../api/AppInfoAccessor"

export const appInfoPromise: Promise<AppInfo> = new AppInfoAccessor().fetch()
import {AppInfoAccessor} from "../api/AppInfoAccessor"

export const appInfoPromise: Promise<AppInfo | void> = new AppInfoAccessor().fetch()
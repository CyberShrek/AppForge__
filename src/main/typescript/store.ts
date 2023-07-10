// All necessaries are stored here

import {fetchAppInfo} from "./utils/api/appInfo"

export let appInfo = {}
fetchAppInfo().then(gottenAppInfo => appInfo = gottenAppInfo)

export let mouseEvent: MouseEvent
document.addEventListener("mousemove", event => mouseEvent = event)
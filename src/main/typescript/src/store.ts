// All necessaries are stored here

import {fetchAppInfo} from "./api/appInfo"

export let appInfo = {}
fetchAppInfo().then(gottenAppInfo => appInfo = gottenAppInfo)

export let mouseEvent: MouseEvent
document.addEventListener("mousemove", event => mouseEvent = event)
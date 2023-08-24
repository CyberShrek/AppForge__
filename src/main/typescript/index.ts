import {resolveCSS} from "./util/resolver"
import {ForgedApplication} from "./fragments/ForgedApplication"

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")
resolveCSS("misc")

document.onreadystatechange = () => {
    if (document.readyState === "complete")
        new ForgedApplication()
}

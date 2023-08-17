import {resolveCSS} from "./utils/resolver"
import {Application} from "./fragments/Application"

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")
resolveCSS("misc")

document.onreadystatechange = () => {
    if (document.readyState === "complete")
        new Application({target: document.body})
            .show()
}

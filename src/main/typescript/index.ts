import {resolveCSS} from "./utils/resolver"
import {Application} from "./fragments/Application"

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")

const application = new Application({target: document.body})
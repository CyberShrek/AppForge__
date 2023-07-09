import {resolveHeader} from "./components/header"
import {resolveCSS} from "./resolvers/resolver"

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")

resolveHeader()
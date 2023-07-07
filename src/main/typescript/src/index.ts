import {resolveHeader} from "./core/header"
import {resolveCSS} from "./stylesResolver"

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")

resolveHeader()
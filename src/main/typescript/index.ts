import {resolveHeader} from "./components/header"
import {resolveCSS} from "./utils/resolver"
import {Component} from "./components/core/Component"

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")

resolveHeader()
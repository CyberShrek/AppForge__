import {resolveCSS} from "./util/resolver"
import {ForgedApplication} from "./applicaton/ForgedApplication"



document.onreadystatechange = () => {
    if (document.readyState === "complete")
        new ForgedApplication()
}

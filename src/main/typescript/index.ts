import {resolveCSS} from "./util/resolver"
import {ForgedApplication} from "./fragments/applicatons/ForgedApplication"



document.onreadystatechange = () => {
    if (document.readyState === "complete")
        new ForgedApplication()
}

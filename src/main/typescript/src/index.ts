import {resolveHeader} from "./core/header"
import {resolveCSS} from "./stylesResolver"
import Swal from "sweetalert2"

Swal.fire({
    title: "FUCK YTO",
    confirmButtonColor: "var(--primary-color)"
})

resolveCSS("global")

resolveCSS("third-party/sweetalert2")

resolveHeader()




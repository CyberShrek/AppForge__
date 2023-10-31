import swal, {SweetAlertResult} from "sweetalert2"
import {type SweetAlertOptions, type SweetAlertPosition} from "sweetalert2"
import {resolveStyle} from "./resolver"

resolveStyle("third-party/sweetalert2")

let mouseEvent: MouseEvent
document.addEventListener("mousemove", event => mouseEvent = event)

export function popupMessage(title?: string, text?: string){
    popupSweetModal({title, text})
}

export function popupList(title?: string, list?: { icon: string, text: string }[], footer?: string){
    popupSweetModal({
        title,
        html:`<ul>${list.map(item => `<li style='list-style-type: "${item.icon}\t"'>${item.text}</li>`).join("")}</ul>`,
        footer
    })
}

export function popupAction(title?: string, text?: string, confirmButtonText?: string, onConfirm?: () => void){
    popupSweetModal({
        title,
        text,
        confirmButtonText,
        showConfirmButton: true
    }).then(result => {
        if(result.isConfirmed)
            onConfirm()
    })
}

export function popupTimeoutAction(text?: string, confirmButtonText?: string, onConfirm?: () => void, radioOptions?: {[key: string]: string}){
    popupSweetModal({
        text, confirmButtonText,
        input: radioOptions ? "radio" : undefined,
        inputOptions: radioOptions ? radioOptions : undefined,
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
        backdrop: false
    }).then(result => {
        if(result.isConfirmed)
            onConfirm()
    })
}

export function popupError(title?: string, error?: Error, footer?: string){
    popupSweetModal({title, text: error.message, icon: "error", footer})
    throw error
}

export function popupHttpDataError(error?: Error, footer?: string){
    popupError("Ошибка получения данных", error, footer)
}

function popupSweetModal(options: SweetAlertOptions): Promise<SweetAlertResult>{
    const position = getSweetMousePosition()
    return swal.fire({
        confirmButtonColor: "var(--primary-color)",
        position,
        showClass: {popup: 'animate__animated '+getAnimationShowClass(position)},
        hideClass: {popup: 'animate__animated animate__zoomOut'},
        showCloseButton: true,
        allowEnterKey: false,
        showConfirmButton: false,
        ...options
    })
}

function getSweetMousePosition(): SweetAlertPosition{
    if(!mouseEvent) return "center"

    const { clientX, clientY } = mouseEvent,
        screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        horizontalPosition = clientX <= screenWidth / 3 ? 'left' : clientX >= (screenWidth / 3) * 2 ? 'right' : 'center',
        verticalPosition = clientY <= screenHeight / 3 ? 'top' : clientY >= (screenHeight / 3) * 2 ? 'bottom' : 'center',
        position = `${verticalPosition}-${horizontalPosition}`

    return position === "top-center" ? "top" : position === "bottom-center" ? "bottom" : position as SweetAlertPosition
}

function getAnimationShowClass(position: SweetAlertPosition): string{
    switch (position) {
        case "top-left"     : return "animate__fadeInTopLeft"
        case "top"          : return "animate__fadeInDown"
        case "top-right"    : return "animate__fadeInTopRight"
        case "center-left"  : return "animate__fadeInLeft"
        case "center"       : return "animate__fadeIn"
        case "center-right" : return "animate__fadeInRight"
        case "bottom-left"  : return "animate__fadeInBottomLeft"
        case "bottom"       : return "animate__fadeInUp"
        case "bottom-right" : return "animate__fadeInBottomRight"
        default             : return ""
    }
}
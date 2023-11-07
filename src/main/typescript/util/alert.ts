import {SweetAlertModule} from "../third-party/SweetAlertModule"

const sweet = new SweetAlertModule()

export function popupMessage(title?: string, text?: string){
    sweet.alert({title, text})
}

export function popupList(title?: string, list?: { icon: string, text: string }[], footer?: string){
    sweet.alert({
        title,
        html:`<ul>${list.map(item => `<li style='list-style-type: "${item.icon}\t"'>${item.text}</li>`).join("")}</ul>`,
        footer
    })
}

export function popupAction(title?: string, text?: string, confirmButtonText?: string, onConfirm?: () => void){
    sweet.alert({
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
    sweet.alert({
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
    sweet.alert({title, text: error.message, icon: "error", footer})
    throw error
}

export function popupHttpDataError(error?: Error, footer?: string){
    popupError("Ошибка получения данных", error, footer)
}
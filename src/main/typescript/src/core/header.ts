import {resolveCSS} from "../stylesResolver"
import {popupError, popupList, popupTimeoutAction} from "../modal"
import {fetchApplicationInfo} from "../api/misc"
import {text} from "stream/consumers";

export function resolveHeader(){
    resolveCSS("header")
    resolveResetButton()
    resolveInfoButton()
    resolveHelpButton()
}

const headerElement = document.getElementById("header")!

function resolveResetButton(){
    resolveButtonAction("reset", () => location.reload())
}

function resolveInfoButton(){
    resolveButtonAction("info", () => {
        fetchApplicationInfo().then(appInfo => {
            if(appInfo){popupList(
                "Информация о приложении",
                [
                    "Версия программы: "+appInfo.version,
                    "Дата последнего обновления: "+appInfo.updateDate,
                    "Технолог: "+appInfo.technologistName
                ])
            }
        })
    })
}

function resolveHelpButton(){
    resolveButtonAction("help", () => {
        popupTimeoutAction(
            "Руководство",
            "Скачать инструкцию",
            downloadUserManual
        )
    })
}

function downloadUserManual(){
    const link = document.createElement('a')
    link.href = `n/d`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

function resolveButtonAction(buttonClassName: string, onClick: () => void){
    headerElement.querySelector("button."+buttonClassName).addEventListener("click", onClick)
}
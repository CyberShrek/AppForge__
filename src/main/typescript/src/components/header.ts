import {resolveCSS} from "../resolvers/resolver"
import {popupList, popupTimeoutAction} from "../utils/modal"
import {fetchAppInfo} from "../utils/api/appInfo"
import {Component} from "./core/Component"

export class Header extends Component{

    constructor() {
        super(document.getElementById("header")!)
        this.listen("", () => {

        })
    }
}

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
        fetchAppInfo().then(appInfo => {
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
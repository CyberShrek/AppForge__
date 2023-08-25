import {resolveCSS} from "../../util/resolver"
import {popupList, popupTimeoutAction} from "../../util/modal"
import {Fragment} from "../abstract/Fragment"
import {createDivElement, createElement, createLinkElement} from "../../util/domWizard";
import {appInfoPromise} from "../../store/appInfo";
import {appConfig} from "../../store/appConfig";

export default class Header extends Fragment{

    constructor() {
        super(createElement("header"))

        appInfoPromise.then(appInfo => {
            this.append(
                createLinkElement(appInfo.groupName, appInfo.groupPath),
            )
        })



        resolveCSS("header")
        this.activateResetButton()
        this.activateInfoButton()
        this.activateHelpButton()
    }

    private activateResetButton(){
        this.activateButton("reset", () => location.reload())
    }

    private activateInfoButton(appInfo: AppInfo){
        this.activateButton("info", button => {
            popupList(
                "Информация",
                [
                    {icon: "🛈", text: "Версия программы: " + appInfo.version},
                    {icon: "🗓", text: "Дата обновления: "  + appInfo.updateDate},
                    {icon: "👤", text: "Технолог: "        + appInfo.technologistName}
                ]
                , appConfig.additionalInfo
                )})
    }

    private activateHelpButton(){
        this.activateButton("help", button => {
            popupTimeoutAction(
                "Руководство",
                "Скачать инструкцию",
                () => downloadUserManual(button.getAttribute("instruction-path"))
            )
        })
    }

    private activateButton(buttonClassName: string, onClick: (clickedButton?: HTMLButtonElement) => void){
        const buttonElement: HTMLButtonElement = this.core.querySelector("button."+buttonClassName)
        buttonElement.addEventListener("click", event => onClick(buttonElement))
    }
}

function downloadUserManual(href){
    const link = document.createElement('a')
    link.href = href
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
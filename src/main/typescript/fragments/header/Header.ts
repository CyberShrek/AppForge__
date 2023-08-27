import {resolveCSS} from "../../util/resolver"
import {popupList, popupTimeoutAction} from "../../util/modal"
import {appInfoPromise} from "../../store/appInfo"
import {appConfig} from "../../store/appConfig"
import {HTMLFragment} from "../abstract/HTMLFragment"

resolveCSS("header")

export default class Header extends HTMLFragment<HTMLHeadingElement>{

    constructor() {
        super(`
            <header>
                <p></p>
                <button class="frameless reset" onclick=location.reload()></button>
                <button class="frameless info"></button>
                <button class="frameless help"></button>
            </header>
        `)

        appInfoPromise.then(appInfo => {
            const paragraphEl = this.root.querySelector("p")
            paragraphEl.textContent = appInfo.name
            if(!!appInfo.groupName && !!appInfo.groupPath)
                this.root.insertAdjacentHTML("afterbegin",
                    `<a href="${appInfo.groupPath}">${appInfo.groupName}</a> | `
                )

            this.activateButton("info", () => this.showAppInfo(appInfo))
            this.activateButton("help", () => this.showHelpDownloader(appInfo.instructionPath))
        })
    }

    private showAppInfo(appInfo: AppInfo){
        popupList(
            "Информация",
            [
                {icon: "🛈", text: "Версия программы: " + appInfo.version},
                {icon: "🗓", text: "Дата обновления: "  + appInfo.updateDate},
                {icon: "👤", text: "Технолог: "        + appInfo.technologistName}
            ],
            appConfig.additionalInfo
        )
    }

    private showHelpDownloader(helpPath: string){
        popupTimeoutAction(
            "Руководство",
            "Скачать инструкцию",
            () => downloadUserManual(helpPath)
        )
    }

    private activateButton(buttonClassName: string, onClick: (clickedButton?: HTMLButtonElement) => void){
        const buttonElement: HTMLButtonElement = this.root.querySelector("button."+buttonClassName)
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
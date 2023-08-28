import {resolveCSS} from "../../util/resolver"
import {popupList, popupTimeoutAction} from "../../util/modal"
import {appConfig} from "../../store/appConfig"
import {Fragment} from "../Fragment"
import {Button} from "../inputs/Button"
import {create} from "../../util/domWizard"
import {valueOrDefault} from "../../util/data";
resolveCSS("header")

export default class Header extends Fragment<HTMLHeadingElement>{

    groupLink = create<HTMLLinkElement>(`<a></a>`)
    appName = create<HTMLParagraphElement>(`<p></p>`)
    resetButton = new Button({className: "frameless reset", image: "reset.svg", hint: "Сброс"}, location.reload)
    infoButton  = new Button({className: "frameless info",  image: "info.svg",  hint: "Информация о приложении"})
    helpButton  = new Button({className: "frameless help",  image: "help.svg",  hint: "Руководство пользователя"})

    constructor() {
        super(`<header id="header"></header>`)

        this.append(this.groupLink, "|", this.appName, this.resetButton, this.infoButton, this.helpButton)
    }

    setAppInfo(appInfo: AppInfo){
        this.groupLink.href        = appInfo.groupPath
        this.groupLink.textContent = appInfo.groupName
        this.appName.textContent   = appInfo.name

        this.infoButton.subscribe(() => this.showAppInfo(appInfo))
        this.helpButton.subscribe(() => this.showHelpDownloader(appInfo.instructionPath))
    }

    private showAppInfo(appInfo: AppInfo){
        popupList(
            "Информация",
            [
                {icon: "🛈", text: "Версия программы: " + appInfo.version},
                {icon: "🗓", text: "Дата обновления: "  + valueOrDefault(appConfig.info.updateDate, appInfo.updateDate)},
                {icon: "👤", text: "Технолог: "        + appInfo.technologistName}
            ],
            appConfig.info.additional
        )
    }

    private showHelpDownloader(helpPath: string){
        popupTimeoutAction(
            "Руководство",
            "Скачать инструкцию",
            () => downloadUserManual(helpPath)
        )
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
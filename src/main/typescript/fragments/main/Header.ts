import {resolveCSS} from "../../util/resolver"
import {popupAction, popupList, popupTimeoutAction} from "../../util/modal"
import {appConfig} from "../../store/appConfig"
import {Fragment} from "../Fragment"
import {Button} from "../inputs/Button"
import {create} from "../../util/domWizard"
import {valueOrDefault} from "../../util/data";
resolveCSS("header")

export default class Header extends Fragment<HTMLHeadingElement>{

    groupLink = create<HTMLLinkElement>(`<a></a>`)
    appName = create<HTMLParagraphElement>(`<p></p>`)
    resetButton = new Button({className: "frameless reset", image: "reset.svg", hint: "Сброс"}, () => location.reload())
    infoButton  = new Button({className: "frameless info",  image: "info.svg",  hint: "Информация о приложении"}, () => this.showAppInfo())
    helpButton  = new Button({className: "frameless help",  image: "help.svg",  hint: "Руководство пользователя"}, () => this.showHelpDownloader())

    private appInfo: AppInfo

    constructor() {
        super(`<header id="header"></header>`)

        this.append(this.groupLink, "|", this.appName, this.resetButton, this.infoButton, this.helpButton)
    }

    setAppInfo(appInfo: AppInfo){
        this.appInfo = appInfo
        this.groupLink.href        = appInfo.groupPath
        this.groupLink.textContent = appInfo.groupName
        this.appName.textContent   = appInfo.name
    }

    private showAppInfo(){
        popupList(
            "Информация",
            [
                {icon: "🛈", text: "Версия программы: " + this.appInfo.version},
                {icon: "🗓", text: "Дата обновления: "  + valueOrDefault(appConfig.info?.updateDate, this.appInfo.updateDate)},
                {icon: "👤", text: "Технолог: "        + this.appInfo.technologistName}
            ],
            appConfig.info?.additional
        )
    }

    private showHelpDownloader(){
        popupAction(
            "Руководство",
            valueOrDefault(appConfig.info.description, ""),
            "Скачать инструкцию",
            () => downloadUserManual(this.appInfo.helpPath)
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
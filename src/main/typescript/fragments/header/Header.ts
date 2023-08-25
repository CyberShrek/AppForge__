import {resolveCSS} from "../../util/resolver"
import {popupList, popupTimeoutAction} from "../../util/modal"
import {Fragment} from "../abstract/Fragment"

export default class Header extends Fragment{

    constructor(location: FragmentLocation) {
        super(location)
        this.core = location.target
        resolveCSS("header")
        this.activateResetButton()
        this.activateInfoButton()
        this.activateHelpButton()
    }

    private activateResetButton(){
        this.activateButton("reset", () => location.reload())
    }

    private activateInfoButton(){
        this.activateButton("info", button => {
            console.log(button)
            popupList(
                "Информация",
                [
                    {icon: "🛈", text: "Версия программы: " + button.getAttribute("version")},
                    {icon: "🗓", text: "Дата обновления: "  + button.getAttribute("update-date")},
                    {icon: "👤", text: "Технолог: "         + button.getAttribute("technologist-name")}
                ]
                , button.getAttribute("footer")
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
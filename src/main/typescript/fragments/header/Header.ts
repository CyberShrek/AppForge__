import {resolveCSS} from "../../utils/resolver"
import {downloadUserManual, fetchAppMetaData} from "../../utils/api/appMetaData"
import {popupList, popupTimeoutAction} from "../../utils/modal"
import {Fragment} from "../abstract/Fragment"

export default class Header extends Fragment{

    private appMetaData: AppMetaData

    constructor(location: FragmentLocation) {
        super(location)
        this.core = location.target
        resolveCSS("header")
        fetchAppMetaData().then(data => {
            this.appMetaData = data
        })
        this.activateResetButton()
        this.activateInfoButton()
        this.activateHelpButton()
    }

    private activateResetButton(){
        this.activateButton("reset", () => location.reload())
    }

    private activateInfoButton(){
        this.activateButton("info", () => {
            popupList(
                "Информация о приложении",
                [
                    "Версия программы: "          + this.appMetaData?.version,
                    "Дата последнего обновления: "+ this.appMetaData?.updateDate,
                    "Технолог: "                  + this.appMetaData?.technologistName
                ])})
    }

    private activateHelpButton(){
        this.activateButton("help", () => {
            popupTimeoutAction(
                "Руководство",
                "Скачать инструкцию",
                () => downloadUserManual(this.appMetaData.manualPath)
            )
        })
    }

    private activateButton(buttonClassName: string, onClick: () => void){
        this.core.querySelector("button."+buttonClassName).addEventListener("click", onClick)
    }
}
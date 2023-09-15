import {Fragment} from "../Fragment"
import {TextArea} from "../inputs/TextArea"
import Select from "../inputs/Select"
import {Button} from "../inputs/Button"
import {demoOptions} from "./demoOptions";

export class DemosHead extends Fragment{

    constructor(onConfirm: (config: AppConfig) => void) {
        super(`<div class="head"><p>Выберите готовую конфигурацию или составьте свою</p></div>`)

        const confirm = () => onConfirm(JSON.parse(configText.text))
        const configText = new TextArea()
        const demosSelect = new Select({}, options => {
            configText.text = options.keys().next().value
            confirm()
        })
        const confirmButton = new Button({className: "confirm", text: "Подтвердить"}, confirm)

        this.append(demosSelect, configText, confirmButton)

        demosSelect.options = demoOptions
    }
}


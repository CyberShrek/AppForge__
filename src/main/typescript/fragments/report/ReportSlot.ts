import {Head} from "./Head"
import {Body} from "./Body"
import {resolveCSS} from "../../util/resolver"
import {popupMessage} from "../../util/modal"
import {scrollIntoElement} from "../../util/domWizard"
import {InlineFragment} from "../InlineFragment"
import {ForgedApplication} from "../applicatons/ForgedApplication";

resolveCSS("report")

export default class ReportSlot extends InlineFragment<ForgedApplication>{

    readonly head = new Head(this, this.config.title)
    readonly body = new Body(this)

    jsonFieldValues: JsonProperties
    reportModelCache: ReportModel

    constructor(parent: ForgedApplication, readonly config: ReportSlotConfig) {
        super(parent, `<div class="report"></div>`)
    }

    applyReport(model: ReportModel, jsonFieldValues: JsonProperties){
        if(!model.data || model.data.length === 0)
            popupMessage("Отчёт пуст", "Отсутствуют подходящие данные")

        this.jsonFieldValues = jsonFieldValues

        this.reportModelCache = model

        this.head.setTitleOrDefault(model.title)
        this.head.showButtons()
        this.body.setReport(model)

        scrollIntoElement(this.root)
    }
}
import Header from "../fragments/header/Header"
import {resolveCSS} from "../util/resolver"

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")
resolveCSS("misc")

export class ForgedApplication{

    readonly header: Header = new Header()
    // readonly mainForm: MainForm = new MainForm()
    // readonly reportSlots: Map<string, ReportSlot> = new Map()

    constructor() {
        this.append(
            this.header,
            // this.mainForm
        )
    }

    // private createMainForm(): MainForm {
    //     const mainForm = new MainForm({target: document.getElementById("main-form") as HTMLFormElement})
    //     mainForm.confirmButton.subscribe(() => {
    //         mainForm.confirmButton.disable()
    //         // The main form apply the "main" report only
    //         this.reportSlots.get("main").applyNewReportByFieldValues(jsonifyFields(mainForm.fields), mainForm.confirmButton.enable)
    //     }, false)
    //     return mainForm
    // }

    // private createReportSlots=(): typeof this.reportSlots => new Map(
    //     [...document.body.querySelectorAll<HTMLDivElement>("div.report")].map(reportSlotElement =>
    //         [reportSlotElement.getAttribute("key"), new ReportSlot({target: reportSlotElement})])
    // )
}
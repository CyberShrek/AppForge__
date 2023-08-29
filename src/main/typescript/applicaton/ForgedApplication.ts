import Header from "../fragments/main/Header"
import {resolveCSS} from "../util/resolver"
import {Fragment} from "../fragments/Fragment"
import {appInfoPromise} from "../store/appInfo";
import Form from "../fragments/form/Form";

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")
resolveCSS("misc")

export class ForgedApplication extends Fragment<HTMLBodyElement>{

    readonly header = new Header()
    readonly mainForm = new Form()
    // readonly reportSlots: Map<string, ReportSlot> = new Map()

    constructor() {
        super(document.body as HTMLBodyElement)
        this.append(
            this.header,
            this.mainForm
        )

        appInfoPromise.then(appInfo => {
            document.title = appInfo.name
            this.header.setAppInfo(appInfo)
        })
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
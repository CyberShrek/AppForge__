import Header from "./header/Header"
import MainForm from "./mainForm/MainForm"
import ReportSlot from "./report/ReportSlot"
import {jsonifyFields, valueOrDefault} from "../util/data"

export class ForgedApplication {

    readonly header: Header
    readonly mainForm: MainForm
    readonly reportSlots: Map<string, ReportSlot>
    // @ts-ignore appConfig variable is placed in the html file
    private readonly config: AppConfig = appConfig

    constructor() {
        document.title = valueOrDefault(this.config.title, "")
        // this.header = this.createHeader()
        // this.mainForm = this.createMainForm()
        // this.reportSlots = this.createReportSlots()
    }

    private createHeader = (): Header => new Header({target: document.getElementById("header")})

    private createMainForm(): MainForm {
        const mainForm = new MainForm({target: document.getElementById("main-form") as HTMLFormElement})
        mainForm.confirmButton.subscribe(() => {
            mainForm.confirmButton.disable()
            // The main form apply the "main" report only
            this.reportSlots.get("main").applyNewReportByFieldValues(jsonifyFields(mainForm.fields), mainForm.confirmButton.enable)
        }, false)
        return mainForm
    }

    private createReportSlots=(): typeof this.reportSlots => new Map(
        [...document.body.querySelectorAll<HTMLDivElement>("div.report")].map(reportSlotElement =>
            [reportSlotElement.getAttribute("key"), new ReportSlot({target: reportSlotElement})])
    )
}
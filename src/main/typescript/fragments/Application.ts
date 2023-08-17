import {Fragment} from "./abstract/Fragment"
import Header from "./header/Header"
import MainForm from "./mainForm/MainForm"
import ReportSlot from "./report/ReportSlot"
import {fetchReport} from "../utils/api/reportsAPI"
import {jsonify, jsonifyFields} from "../utils/misc";

export class Application extends Fragment{

    readonly header: Header
    readonly mainForm: MainForm
    readonly reportSlots: Map<string, ReportSlot>

    constructor(location: FragmentLocation) {
        super(location)
        this.core = location.target
        this.header = this.createHeader()
        this.mainForm = this.createMainForm()
        this.reportSlots = this.createReportSlots()
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
        [...this.core.querySelectorAll<HTMLDivElement>("div.report")].map(reportSlotElement =>
            [reportSlotElement.getAttribute("key"), new ReportSlot({target: reportSlotElement})])
    )
}
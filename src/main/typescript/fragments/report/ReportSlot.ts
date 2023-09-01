import {Fragment} from "../Fragment"
import {fetchReport} from "../../api/reportsAPI"
import {Head} from "./Head"
import {Body} from "./Body"
import {resolveCSS} from "../../util/resolver"
import {popupMessage} from "../../util/modal"
import {scrollIntoElement} from "../../util/domWizard"

resolveCSS("report")

export default class ReportSlot extends Fragment{

    readonly isModal: boolean
    readonly head: Head
    readonly body: Body
    protected readonly path: string

    jsonFieldValues: JsonProperties
    reportModel: ReportModel

    constructor(public location: FragmentLocation) {
        super(location)
        this.core = location.target
        this.path = this.core.getAttribute("path")
        this.head = new Head(this.core.querySelector(".head"), this)
        this.body = new Body(this.core.querySelector(".body"), this)
        this.isModal = this.core.getAttribute("modal") === "true"
    }

    applyNewReport(model: ReportModel){
        if(model.table.data === null || model.table.data.length === 0)
            popupMessage("Отчёт пуст", "Отсутствуют подходящие данные")

        if(!model.title)
            model.title = this.head.title

        this.report = model
    }

    applyNewReportByFieldValues(values: JsonProperties, onLoad?: () => {}){
        this.head.loading.show()
        fetchReport(this.path, values).then(model => {
            this.head.loading.hide()
            onLoad()
            this.reset()
            this.jsonFieldValues = values
            this.applyNewReport(model)
            scrollIntoElement(this.core)
        })
    }

    private set report(model: ReportModel){
        this.reset()
        this.reportModel = model
        if(model.title)
            this.head.title = model.title
        if(model.table)
            this.body.createTable(model.table)
        if(model.charts) {
            this.body.createCharts(model.charts)
            // Hide by default
            // this.body.toggleCharts()
        }

        this.applyButtons(!!model.charts)
    }

    private applyButtons(hasCharts: boolean){
        if(hasCharts)
            this.head.addChartsButton()
        if(!this.isModal)
            this.head.addToTopButton()
        this.head.addCollapseButton()
        this.head.addFullscreenButton()
    }

    private reset(){
        this.head.reset()
        this.body.reset()
    }
}
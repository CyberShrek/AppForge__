import {Fragment} from "../abstract/Fragment"
import {createDivElement, emptyElement} from "../../utils/DOMWizard"
import {fetchReport} from "../../utils/api/reportsAPI"
import {Head} from "./Head"
import {Body} from "./Body"

export default class ReportSlot extends Fragment{

    protected readonly path: string
    protected readonly head: Head
    protected readonly body: Body

    constructor(public location: FragmentLocation) {
        super(location)
        this.core = location.target
        this.path = this.core.getAttribute("path")
        this.head = new Head(this.core.querySelector(".head"))
        this.body = new Body(this.core.querySelector(".body"))
    }

    applyNewReportByValues(values: FormValues){
        this.reset()
        this.body.showLoading()
        fetchReport(this.path, values).then(model => this.report = model)
    }

    private set report(model: ReportModel){
        this.reset()
        if(model.title)
            this.head.title = model.title
        if(model.table)
            this.body.applyTable(model.table)
        if(model.charts)
            this.body.applyCharts(model.charts)

        this.applyButtons(!!model.table, !!model.charts)
    }

    private applyButtons(hasTable: boolean, hasCharts: boolean){
        this.head.applyCollapseButton().subscribe(() => this.body.toggleCollapse())
        this.head.applyFullscreenButton()
        this.head.applyToTopButton()
    }

    private reset(){
        this.head.reset()
        this.body.reset()
    }
}
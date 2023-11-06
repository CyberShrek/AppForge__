import {emptyElement} from "../../util/domWizard"
import {Table} from "./content/Table"
import {Chart} from "./content/Chart"
import {Button} from "../inputs/Button"
import {popupTimeoutAction} from "../../util/alert"
import ReportSlot from "./ReportSlot"
import {prettify} from "../../util/data"
import {Context} from "./content/Context"
import {InlineFragment} from "../InlineFragment"

export class Body extends InlineFragment<ReportSlot>{

    context: Context
    table: Table
    charts: Chart[]

    private _collapsed: boolean = false

    private cache: ReportModel

    constructor(reportSlot: ReportSlot) {
        super(reportSlot, `<div class="body"></div>`)
    }

    setReport(model: ReportModel){
        this.reset()
        this.cache = model
        if(model.context)
            this.context = new Context(this, model.context)
        if(model.table)
            this.table = new Table(this, model.data, model.dataFeatures, model.table)
    }

    // createCharts(models: ChartModel[] = this.chartsModelCache): Chart[]{
    //     this.chartsModelCache = models
    //     this.chartsWrapper = createDivElement({class: "charts"})
    //     this.exportChartsButton = this.createExportButton(this.chartsWrapper, "Экспортировать диаграммы в .jpeg?",
    //         () => this.exportCharts())
    //     this.core.insertAdjacentElement("afterbegin", this.chartsWrapper)
    //     this.charts = models.map(model => new Chart({target: this.chartsWrapper, position: "beforeend"}, model))
    //     return this.charts
    // }

    // toggleCharts(){
    //     if(!!this.chartsWrapper) {
    //         this.chartsWrapper.remove()
    //         this.chartsWrapper = undefined
    //     } else
    //         this.createCharts()
    // }

    get collapsed(): typeof this._collapsed{
        return this._collapsed
    }

    set collapsed(collapsed: typeof this._collapsed){
        this._collapsed = collapsed
        if(collapsed)
            emptyElement(this.root)
        else
            this.setReport(this.cache)
    }

    collapse=() => this.collapsed = true
    expand=() => this.collapsed = false

    reset(){
        this.cache = undefined
        emptyElement(this.root)
    }

    // private exportCharts(){
    //     this.exportChartsButton.hide()
    //     domtoimage.toJpeg(this.chartsWrapper)
    //         .then((dataUrl) => {
    //             const link = document.createElement("a")
    //             link.download = "charts.jpeg"
    //             link.href = dataUrl
    //             link.click()
    //             link.remove()
    //         })
    //         .finally(() => {
    //             this.exportChartsButton.show()
    //         })
    // }
}
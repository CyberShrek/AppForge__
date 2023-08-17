import {ExistedFragment} from "../abstract/ExistedFragment"
import {createDivElement, emptyElement} from "../../utils/DOMWizard";
import {Table} from "./content/Table";
import {Chart} from "./content/Chart";
import {Button} from "../inputs/Button";
import {popupTimeoutAction} from "../../utils/modal"
import domtoimage from "dom-to-image";
import ReportSlot from "./ReportSlot";
import {stringify} from "../../utils/misc";
import {downloadXlsx} from "../../utils/api/reportsAPI";

export class Body extends ExistedFragment{

    private _collapsed: boolean = false
    private tableModelCache: TableModel
    private xlsxTableModelCache: XlsxTableModel
    private chartsModelCache: ChartModel[]

    private table: Table
    private charts: Chart[]

    private exportChartsButton: Button
    private chartsWrapper: HTMLDivElement

    private exportTableButton: Button
    private tableWrapper: HTMLDivElement


    constructor(core: HTMLDivElement, private readonly parentReportSlot: ReportSlot) {
        super(core)
    }

    createTable(model: TableModel = this.tableModelCache): Table{
        this.tableModelCache = model
        this.tableWrapper = createDivElement({class: "table"})
        this.core.insertAdjacentElement("beforeend", this.tableWrapper)
        this.table = new Table({target: this.tableWrapper, position: "beforeend"}, model)
        this.xlsxTableModelCache = this.getXlsxTableModel()
        this.exportTableButton = this.createExportButton(this.tableWrapper, "Экспортировать таблицу в .xlsx?", () => this.exportTable())
        return this.table
    }

    createCharts(models: ChartModel[] = this.chartsModelCache): Chart[]{
        this.chartsModelCache = models
        this.chartsWrapper = createDivElement({class: "charts"})
        this.exportChartsButton = this.createExportButton(this.chartsWrapper, "Экспортировать диаграммы в .jpeg?",
            () => this.exportCharts())
        this.core.insertAdjacentElement("afterbegin", this.chartsWrapper)
        this.charts = models.map(model => new Chart({target: this.chartsWrapper, position: "beforeend"}, model))
        return this.charts
    }

    toggleCharts(){
        if(!!this.chartsWrapper) {
            this.chartsWrapper.remove()
            this.chartsWrapper = undefined
        } else
            this.createCharts()
    }

    get collapsed(): typeof this._collapsed{
        return this._collapsed
    }

    set collapsed(collapsed: typeof this._collapsed){
        this._collapsed = collapsed
        if(this.collapsed) emptyElement(this.core)
        else {
            if(this.tableModelCache) this.createTable()
            if(this.chartsModelCache) this.createCharts()
        }
    }
    collapse=() => this.collapsed = true
    expand=() => this.collapsed = false


    reset(){
        this.tableModelCache = undefined
        this.chartsModelCache = undefined
        emptyElement(this.core)
    }

    private createExportButton(target: HTMLElement, actionText: string, action: () => void): Button {
        const button = new Button({target, position: "afterbegin"})
        button.subscribe(() => popupTimeoutAction(actionText, "Подтвердить", action))
        button.image = "img/download.svg"
        button.hint = "Экспортировать"
        return button
    }

    exportTable(){
        downloadXlsx(this.xlsxTableModelCache)
    }

    private getXlsxTableModel(): XlsxTableModel{
        const xlsxConfig = this.tableModelCache.xlsxExport
        const exportContext: string[] = []
        for (const key in xlsxConfig.context){
            const value = xlsxConfig.context[key]
            const contextValue = this.parentReportSlot.jsonFieldValues[value]
            exportContext.push(`${key}: ${contextValue ? stringify(contextValue) : value}`)
        }
        return {
            name: xlsxConfig.name,
            context: exportContext,
            title: this.parentReportSlot.reportModel.title,
            header: getCompleteRowsFromElement(this.table.thead),
            body: getCompleteRowsFromElement(this.table.tbody),
            total: getCompleteRowsFromElement(this.table.tfoot)[0]
        }
    }

    private exportCharts(){
        this.exportChartsButton.hide()
        domtoimage.toJpeg(this.chartsWrapper)
            .then((dataUrl) => {
                const link = document.createElement("a")
                link.download = "charts.jpeg"
                link.href = dataUrl
                link.click()
                link.remove()
            })
            .finally(() => {
                this.exportChartsButton.show()
            })
    }
}

function getCompleteRowsFromElement(element: Element): CompleteRow[]{
    let rows: CompleteRow[] = []
    element.querySelectorAll("tr").forEach(tr => {
        let row: CompleteRow = []
        tr.querySelectorAll<HTMLTableCellElement>("td, th").forEach(tc => {
            if(!tc.hidden) {
                row.push({
                    text: tc.innerText.trim(),
                    colspan: tc.colSpan,
                    rowspan: tc.rowSpan
                })
            }
        })
        rows.push(row)
    })
    return rows
}
import {Fragment} from "../../Fragment"
import {emptyElement, createElement} from "../../../utils/DOMWizard"
import {concatMaps, numberOf, sortMap} from "../../../utils/misc"

export class TableFragment extends Fragment{

    protected thead: HTMLTableSectionElement = createElement("thead")
    protected tbody: HTMLTableSectionElement = createElement("tbody")
    protected tfoot: HTMLTableSectionElement = createElement("tfoot")

    protected bodyContent: TableBody = new Map()

    constructor(location: FragmentLocation) {
        super(createElement("table"), location)
        this.core.append(this.thead, this.tfoot, this.tbody)
    }

    setHead(head: TableHead){
        emptyElement(this.thead)
        head.forEach(headRow =>
            this.thead.appendChild(
                this.createHTMLRow(headRow.map(
                    headCell => this.createHTMLHeadCell(headCell.content, headCell.rowSpan, headCell.colSpan))
                )
            )
        )
    }

    setBody(bodyContent: TableBody){
        emptyElement(this.tbody)
        this.bodyContent = new Map()
        this.addBody(bodyContent)
    }

    addBody(bodyContent: TableBody){
        this.bodyContent = sortMap(concatMaps(this.bodyContent, bodyContent))
        this.bodyContent.forEach((valueCells, primaryCells) =>
            this.tbody.append(this.createHTMLRow(
                primaryCells.map(cell => this.createHTMLCell(cell, "primary")).concat(
                    valueCells.map(cell => this.createHTMLCell(String(cell))))))
        )
        this.groupPrimaryCells()
    }

    setTotal(total?: ValueCell[]){
        if(!total){
            total = []
            this.bodyContent.forEach(values=> values.forEach((value, i) => {
                total[i] = total[i] ? numberOf(total[i]) + numberOf(value) : value
            }))
        }
        this.tfoot.querySelector(".total")?.remove()
        this.tfoot.appendChild(this.createHTMLTotalRow(total.map(value => this.createHTMLCell(value))))
    }

    private createHTMLTotalRow(htmlCells: HTMLTableCellElement[]): HTMLTableRowElement{
        const primaryTotalCell = this.createHTMLCell("Всего")
        primaryTotalCell.colSpan = this.tbody.querySelector("tr").querySelectorAll(".primary").length
        return this.createHTMLRow([primaryTotalCell, ...htmlCells], "total")
    }

    private createHTMLRow(htmlCells: HTMLTableCellElement[], cssClass?: string): HTMLTableRowElement{
        const tr: HTMLTableRowElement = createElement("tr", "", {class: cssClass})
        tr.append(...htmlCells)
        return tr
    }

    private createHTMLHeadCell(cellContent: string, rowSpan: number = 1, colSpan: number = 1): HTMLTableCellElement{
        return createElement("th", cellContent, {rowspan: rowSpan}, {colspan: colSpan})
    }

    private createHTMLCell(cellContent: string|number, cssClass?: string): HTMLTableCellElement {
        return createElement("td", String(cellContent), {class: cssClass})
    }

    private groupPrimaryCells(startHtmlRow: HTMLTableRowElement = this.tbody.firstElementChild as HTMLTableRowElement,
                              endHtmlRow: HTMLTableRowElement = this.tbody.lastElementChild as HTMLTableRowElement,
                              nesting: number = 0){
        if(startHtmlRow === endHtmlRow) return
        const primaryHtmlCell = startHtmlRow.cells[nesting]
        if(!primaryHtmlCell?.classList?.contains("primary")) return
        let nextHtmlRow = startHtmlRow
        do {
            nextHtmlRow = nextHtmlRow.nextElementSibling as HTMLTableRowElement
            const nextPrimaryHtmlCell = nextHtmlRow.cells[0]
            if(primaryHtmlCell.textContent === nextPrimaryHtmlCell.textContent){
                primaryHtmlCell.rowSpan++
                nextPrimaryHtmlCell.hidden = true
            } else {
                this.groupPrimaryCells(startHtmlRow, nextHtmlRow, nesting + 1)
                this.groupPrimaryCells(nextHtmlRow, endHtmlRow)
                return
            }
        }
        while (nextHtmlRow !== endHtmlRow)
    }
}
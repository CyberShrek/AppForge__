import {Fragment} from "../../Fragment"
import {FragmentLocation} from "../../../entities/Fragment"
import {emptyElement, createElement} from "../../../utils/domWizard"
import {concatMaps, mapOf, numberOf, sortMap} from "../../../utils/misc"

export class TableFragment extends Fragment{

    protected thead: HTMLTableSectionElement = createElement("thead")
    protected tbody: HTMLTableSectionElement = createElement("tbody")
    protected tfoot: HTMLTableSectionElement = createElement("tfoot")

    private bodyContent: TableBody = mapOf()

    // Allows to filter the bodyContent. Key is column id
    private filters: Map<number, HTMLInputElement>

    constructor(location: FragmentLocation) {
        super(createElement("table"), location)
        this.core.append(this.thead, this.tfoot, this.tbody)
        this.slot = this.tfoot
    }

    setHead(head: TableHead){
        emptyElement(this.thead)
        head.forEach(headRow => {
            let columnId = 0
                this.thead.appendChild(
                    this.createHTMLRow(headRow.map(
                        (headCell, index) => {
                            const htmlHeadCell = this.createHeadHTMLCell(headCell.content, headCell.rowSpan, headCell.colSpan)
                            if (headCell.hasFiler) htmlHeadCell.setAttribute("filter", String(headCell.hasFiler))
                            return htmlHeadCell
                        })
                    ))
            }
        )
    }

    setBody(bodyContent: TableBody){
        emptyElement(this.tbody)
        this.bodyContent = mapOf()
        this.addBody(bodyContent)
    }

    addBody(bodyContent: TableBody){
        this.bodyContent = sortMap(concatMaps(this.bodyContent, bodyContent))
        this.bodyContent.forEach((valueCells, primaryCells) =>
            this.tbody.append(this.createHTMLRow(
                primaryCells.map(cell => this.createHTMLPrimaryCell(cell)).concat(
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
        this.tfoot.appendChild(this.createTotalHTMLRow(total.map(value => this.createHTMLCell(value))))
    }

    private createHTMLRow(htmlCells?: HTMLTableCellElement[]): HTMLTableRowElement{
        const tr: HTMLTableRowElement = createElement("tr")
        if(htmlCells)
            tr.append(...htmlCells)

        return tr
    }

    private createTotalHTMLRow(htmlCells: HTMLTableCellElement[]): HTMLTableRowElement{
        const primaryTotalCell = this.createHTMLCell("Всего")
        primaryTotalCell.colSpan = this.tbody.querySelector("tr").querySelectorAll(".primary").length
        const totalHtmlRow = this.createHTMLRow([primaryTotalCell, ...htmlCells])
        totalHtmlRow.className = "total"
        return totalHtmlRow
    }

    private createHeadHTMLCell(cellContent: string, rowSpan?: number, colSpan?: number){
        const th: HTMLTableCellElement = this.createHTMLCell(cellContent, true)
        if(rowSpan) th.rowSpan = rowSpan
        if(colSpan) th.colSpan = colSpan
        return th
    }

    private createHTMLPrimaryCell(cellContent: string): HTMLTableCellElement{
        const td: HTMLTableCellElement = this.createHTMLCell(cellContent)
        td.className = "primary"
        return td
    }

    private createHTMLCell(cellContent: string|number, isHead: boolean = false): HTMLTableCellElement{
        const td: HTMLTableCellElement = createElement(isHead === true ? "th" : "td")
        td.textContent = String(cellContent)
        return td
    }

    private setFilter(targetHtmlHeaderCell: HTMLTableCellElement, columnId: number){

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
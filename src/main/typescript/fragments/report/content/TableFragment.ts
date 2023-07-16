import {Fragment} from "../../Fragment"
import {FragmentLocation} from "../../../entities/Fragment"
import {emptyElement, createElement} from "../../../utils/domWizard"
import {sortMap} from "../../../utils/misc"

export class TableFragment extends Fragment{

    private thead: HTMLTableSectionElement = createElement("thead")
    private tbody: HTMLTableSectionElement = createElement("tbody")
    private tfoot: HTMLTableSectionElement = createElement("tfoot")

    constructor(location: FragmentLocation) {
        super(createElement("table"), location)
        this.core.append(this.thead, this.tfoot, this.tbody)
    }

    setHead(head: TableHead){
        emptyElement(this.thead)
        head.forEach(headRow => this.thead.appendChild(
            this.createHTMLRow(headRow.map(
                headCell => this.createHeadHTMLCell(headCell.content, headCell.rowSpan, headCell.colSpan)
            ))
        ))
    }

    setBody(body: TableBody){
        emptyElement(this.tbody)
        sortMap(body).forEach((valueCells, primaryCells) =>
            this.appendRow(primaryCells, valueCells)
        )
    }

    setTotal(total: ValueCell[]){

    }

    appendRow(primaryCells: PrimaryCell[], valueCells: ValueCell[]){
        this.tbody.append(this.createHTMLRow(
            primaryCells.map(cell => this.createHTMLPrimaryCell(cell)).concat(
                valueCells.map(cell => this.createHTMLCell(String(cell))))))
    }

    private createHTMLRow(htmlCells?: HTMLTableCellElement[]): HTMLTableRowElement{
        const tr: HTMLTableRowElement = createElement("tr")
        if(htmlCells)
            tr.append(...htmlCells)

        return tr
    }

    private createHeadHTMLCell(cellContent: string, rowSpan?: number, colSpan?: number){
        const th: HTMLTableCellElement = this.createHTMLCell(cellContent)
        if(rowSpan) th.rowSpan = rowSpan
        if(colSpan) th.colSpan = colSpan
        return th
    }

    private createHTMLPrimaryCell(cellContent: string): HTMLTableCellElement{
        const td: HTMLTableCellElement = this.createHTMLCell(cellContent)
        td.className = "primary"
        return td
    }

    private createHTMLCell(cellContent: string): HTMLTableCellElement{
        const td: HTMLTableCellElement = createElement("td")
        td.textContent = cellContent
        return td
    }

    // Checks if the previous row primary cells has one or more cells with the same name comparing with the argument cells;
    // if it is, increases rowspan by 1 of the corresponding cells, what causes visual grouping.
    // Returns argument primary cell without spanned cells
    private spanPrimaryCells(nextPrimaryCells: PrimaryCell[]){
        if(this.tbody.lastElementChild && this.tbody.lastElementChild instanceof HTMLTableRowElement) {
            let previousHTMLRow: HTMLTableRowElement = this.tbody.lastElementChild
            let previousPrimaryCells: PrimaryCell[]
            while (previousPrimaryCells.length <= 1) {
                previousHTMLRow = previousHTMLRow.previousElementSibling as HTMLTableRowElement
                previousPrimaryCells = [...previousHTMLRow.querySelectorAll("td.primary").values()]
                    .map(htmlCell => htmlCell.textContent)
            }
        }
        return nextPrimaryCells
    }
}
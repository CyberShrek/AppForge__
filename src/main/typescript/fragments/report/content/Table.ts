import {Fragment} from "../../abstract/Fragment"
import {emptyElement, createElement} from "../../../utils/DOMWizard"
import {concatMaps, filterMap, numberOf, sortMap, stringify} from "../../../utils/misc"
import {Text} from "../../inputs/Text"
import {resolveCSS} from "../../../utils/resolver"

resolveCSS("table")

export class Table extends Fragment{

    thead: HTMLTableSectionElement = createElement("thead")
    tbody: HTMLTableSectionElement = createElement("tbody")
    tfoot: HTMLTableSectionElement = createElement("tfoot")

    protected _tableMap: TableMap = new Map()

    // Key is filtrated column, value is filter text value
    protected filtersMap: Map<number, string> = new Map()

    constructor(location: FragmentLocation, private model: TableModel) {
        super(location)
        this.core = createElement("table")
        this.core.append(this.thead, this.tfoot, this.tbody)
        this.head = model.head
        this.tableMap = new Map(model.data.map(rowData => [
            rowData.slice(0, model.primaryColumnsNumber).map(cellData => stringify(cellData)),
            rowData.slice(model.primaryColumnsNumber)
        ]))
        if(model.total)
            this.total = model.total.length > 0 ? model.total : this.calculateTotal()
    }

    private set head(head: TableHead){
        emptyElement(this.thead)
        head.forEach(headRow => {
            this.thead.appendChild(
                this.createHTMLRow(headRow.map(
                    headCell => {
                        const htmlHeadCell = this.createHTMLHeadCell(headCell.text, headCell.rowspan, headCell.colspan)
                        if (headCell.addFilter === true) this.setFilter(htmlHeadCell)
                        return htmlHeadCell
                    })
                )
            )
        })
    }

    private set tableMap(tableMap: TableMap){
        emptyElement(this.tbody)
        this._tableMap = new Map()
        this.addTableMap(tableMap)
        this.groupPrimaryCells()
    }

    private addTableMap(tableMap: TableMap){
        this._tableMap = concatMaps(this._tableMap, tableMap)
        sortMap(this.filtrateTableMap(this._tableMap)).forEach((valueCells, primaryCells) =>
            this.tbody.append(this.createHTMLRow(
                primaryCells.map(cell => {
                    const primaryCellElement = this.createHTMLCell(cell)
                    primaryCellElement.classList.add("primary")
                    return primaryCellElement
                }).concat(
                    valueCells.map(cell => this.createHTMLCell(String(cell))))))
        )
    }

    private set total(total: CellData[]){
        this.tfoot.querySelector(".total")?.remove()
        this.tfoot.appendChild(this.createHTMLTotalRow(total.map(value => this.createHTMLCell(value))))
    }

    private calculateTotal(): CellData[]{
        const total: CellData[] = []
        this._tableMap.forEach(values=> values.forEach((value, i) => {
            total[i] = total[i] ? numberOf(total[i]) + numberOf(value) : value
        }))
        return total
    }

    private createHTMLTotalRow(htmlCells: HTMLTableCellElement[]): HTMLTableRowElement{
        const primaryTotalCell: HTMLTableCellElement = this.createHTMLCell("Итого")
        const totalRow: HTMLTableRowElement = this.createHTMLRow([primaryTotalCell, ...htmlCells])
        primaryTotalCell.colSpan = this.tbody.querySelector("tr").querySelectorAll(".primary").length
        return totalRow
    }

    private createHTMLRow(htmlCells: HTMLTableCellElement[]): HTMLTableRowElement{
        const tr: HTMLTableRowElement = createElement("tr")
        tr.append(...htmlCells)
        return tr
    }

    private createHTMLHeadCell(cellContent: string, rowSpan: number = 1, colSpan: number = 1): HTMLTableCellElement{
        return createElement("th", cellContent, {rowspan: rowSpan}, {colspan: colSpan})
    }

    private createHTMLCell(data: CellData): HTMLTableCellElement {
        return createElement("td", String(data))
    }

    private setFilter(htmlHeadCell: HTMLTableCellElement){
        const title = htmlHeadCell.textContent
        htmlHeadCell.textContent = ""
        const filterFragment = new Text(
            {target: htmlHeadCell, position: "beforeend"},
            {title, placeholder: "🔎"}
        )
        filterFragment.subscribe(value => {
            console.log(getCellIndexWithSpans(htmlHeadCell))
            this.filtersMap.set(getCellIndexWithSpans(htmlHeadCell), value)
            this.tableMap = this._tableMap
        }, false)
    }


    private filtrateTableMap(tableMap: TableMap): TableMap{
        return filterMap(tableMap, (valueCells, primaryCells) => {
            const cellTexts = primaryCells.concat(valueCells.map(v => String(v)))
            for (let i = 0; i < cellTexts.length; i++) {
                const filterText = this.filtersMap.get(i)
                if(!cellTexts[i].toLowerCase().includes(filterText ? filterText.toLowerCase() : ""))
                    return false
            }
            return true
        })
    }

    // TODO works incorrectly if the size is more than 1
    private groupPrimaryCells(size: number = this.model.groupedColumnsNumber ? this.model.groupedColumnsNumber : 0,
                              startHtmlRow: HTMLTableRowElement = this.tbody.firstElementChild as HTMLTableRowElement,
                              endHtmlRow: HTMLTableRowElement = this.tbody.lastElementChild as HTMLTableRowElement,
                              nesting: number = 0){
        if(startHtmlRow === endHtmlRow || size === nesting) return
        const primaryHtmlCell= startHtmlRow.cells[nesting]
        if(!primaryHtmlCell?.classList?.contains("primary")) return
        let nextHtmlRow = startHtmlRow
        do {
            nextHtmlRow = nextHtmlRow.nextElementSibling as HTMLTableRowElement
            const nextPrimaryHtmlCell = nextHtmlRow.cells[0]
            if(primaryHtmlCell.textContent === nextPrimaryHtmlCell.textContent){
                primaryHtmlCell.rowSpan++
                nextPrimaryHtmlCell.hidden = true
            } else {
                this.groupPrimaryCells(size, startHtmlRow, nextHtmlRow, nesting + 1)
                this.groupPrimaryCells(size, nextHtmlRow, endHtmlRow)
                return
            }
        }
        while (nextHtmlRow !== endHtmlRow)
    }
}
function getCellIndexWithSpans(targetCell: HTMLTableCellElement): number  {

    let result: number = -1

    let rows = targetCell.parentElement.parentElement.querySelectorAll('tr'),
        matrix = [],
        cell: HTMLTableCellElement = null,
        rowIndex: number = null,
        colIndex: number = null


    for (let i = 0; i < rows.length && result === -1; i++) {
        console.log(true)
        matrix[i] = matrix[i] || [];
        const row = rows[i];

        for (let j = 0; j < row.cells.length; j++) {
            cell = row.cells[j]
            rowIndex = row.rowIndex;
            matrix[rowIndex] = matrix[rowIndex] || [];
            colIndex = null;
            for (let l = 0; l <= matrix[rowIndex].length && colIndex === null; l++) {
                if (!matrix[rowIndex][l]) colIndex = l;
            }

            if (cell === targetCell) {
                result = colIndex
                break;
            }

            for (let k = rowIndex; k < rowIndex + cell.rowSpan; k++) {
                for (let l = colIndex; l < colIndex + cell.colSpan; l++) {
                    matrix[k] = matrix[k] || [];
                    matrix[k][l] = 1;
                }
            }
        }
    }

    return result;
}

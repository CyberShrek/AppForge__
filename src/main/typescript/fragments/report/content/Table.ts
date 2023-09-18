                                                                                                                                                                                                                                                                import {emptyElement, create} from "../../../util/domWizard"
import {concatMaps, filterMap, numberOf, sortMap, stringify} from "../../../util/data"
import {TextInput} from "../../inputs/TextInput"
import {resolveCSS} from "../../../util/resolver"
import {InlineFragment} from "../../InlineFragment"
import {Body} from "../Body"
import {XlsxAccessor} from "../../../api/XlsxAccessor";

resolveCSS("table")

export class Table extends InlineFragment<Body>{

    thead: HTMLTableSectionElement
    tbody: HTMLTableSectionElement
    tfoot: HTMLTableSectionElement

    protected _tableData: TableMapData = new Map()

    // Key is filtrated column, value is filter text value
    protected filtersMap: Map<number, string> = new Map()

    readonly xlsxAccessor: XlsxAccessor

    constructor(body: Body, data: MatrixData, private model: TableModel) {
        super(body, `
            <div class="table">
                <table>
                    <thead></thead>
                    <tfoot></tfoot>
                    <tbody></tbody>
                </table>
            </div>`
        )
        this.thead = this.select("thead")
        this.tbody = this.select("tbody")
        this.tfoot = this.select("tfoot")
        if(model.head) this.head = model.head
        if(data) {
            this.tableMapData = new Map(data.map(rowData => [
                rowData.slice(0, model.primaryColumnsNumber).map(cellData => stringify(cellData)),
                rowData.slice(model.primaryColumnsNumber)
            ]))
            if(data.length > 1)
                this.total = this.calculateTotal()
        }
        this.xlsxAccessor = new XlsxAccessor({
            name:    this.parent.parent.head.title,
            context: this.parent.context?.visibleValues,
            title:   this.parent.parent.head.title,
            header:  getCompleteRowsFromElement(this.thead),
            body:    getCompleteRowsFromElement(this.tbody),
            total:   getCompleteRowsFromElement(this.tfoot)[0]
        })
    }

    private set head(head: TableHead){
        emptyElement(this.thead)
        this.thead.innerHTML += `<tr>${head.map(cellText => `<th>${cellText}</th>`).join('')}</tr>`
        // head.forEach(headRow =>
        //     this.thead.innerHTML +=
        //         `<tr>${headRow.map(headCell => `
        //             <th rowspan="${headCell.rowspan}"
        //                 colspan="${headCell.colspan}"
        //                 ${headCell.addFilter ? 'class="filter"' : ''}>
        //                 ${headCell.text}
        //             </th>`).join("")}
        //         </tr>`
        //     )
    }

    private set tableMapData(tableData: TableMapData){
        emptyElement(this.tbody)
        this._tableData = new Map()
        this.appendTableMapData(tableData)
        this.groupPrimaryCells()
    }

    private appendTableMapData(tableData: TableMapData){
        this._tableData = concatMaps(this._tableData, tableData)
        sortMap(this.filtrateTableMap(this._tableData)).forEach((valueCells, primaryCells) =>
            this.tbody.innerHTML += `
                <tr>
                    ${primaryCells.map(data => `<td class="primary">${data}</td>`).concat(
                        valueCells.map(data => `<td>${data}</td>`)
                    ).join("")}
                </tr>`
        )
    }

    private set total(total: CellData[]){
        this.tfoot.querySelector(".total")?.remove()
        this.tfoot.innerHTML += `
            <tr class="total">
                <td class="primary" 
                    colspan="${this.tbody.querySelector("tr").querySelectorAll(".primary").length}">
                    Итого
                </td>
                ${total.map(value => `<td>${value}</td>`).join("")}
            </tr>`
    }

    private calculateTotal(): CellData[]{
        const total: CellData[] = []
        this._tableData.forEach(values=> values.forEach((value, i) => {
            total[i] = total[i] ? numberOf(total[i]) + numberOf(value) : value
        }))
        return total
    }

    private applyFilter(htmlHeadCell: HTMLTableCellElement){
        htmlHeadCell.append(
            new TextInput("🔎", value => {
                this.filtersMap.set(getCellIndexWithSpans(htmlHeadCell), value)
                this.tableMapData = this._tableData
            }
            ).root
        )
    }


    private filtrateTableMap(tableMap: TableMapData): TableMapData{
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
            rowIndex = row.rowIndex
            matrix[rowIndex] = matrix[rowIndex] || []
            colIndex = null
            for (let l = 0; l <= matrix[rowIndex].length && colIndex === null; l++) {
                if (!matrix[rowIndex][l]) colIndex = l
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

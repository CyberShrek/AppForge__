import {create, emptyElement, scrollIntoElement} from "../../../util/domWizard"
import {filterMap, numberOf} from "../../../util/data"
import {TextInput} from "../../inputs/TextInput"
import {resolveCSS} from "../../../util/resolver"
import {InlineFragment} from "../../InlineFragment"
import {Body} from "../Body"
import {XlsxAccessor} from "../../../api/XlsxAccessor";
import {executeFormulaForRowData} from "../../../util/DANGEROUS";

resolveCSS("table")

export class Table extends InlineFragment<Body>{

    thead: HTMLTableSectionElement
    tbody: HTMLTableSectionElement
    tfoot: HTMLTableSectionElement

    // Key is filtrated column, value is filter text value
    private filtersMap: Map<number, string> = new Map()

    readonly xlsxAccessor: XlsxAccessor

    constructor(body: Body,
                private readonly data: MatrixData,
                private readonly colFeatures: DataFeature[],
                private readonly model: TableModel)
    {
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
        if(data) this.appendData(data)
        this.xlsxAccessor = new XlsxAccessor({
            name:    this.parent.parent.head.title,
            context: this.parent.context?.visibleValues,
            title:   this.parent.parent.head.title,
            header:  getCompleteRowsFromElement(this.thead),
            body:    getCompleteRowsFromElement(this.tbody),
            total:   getCompleteRowsFromElement(this.tfoot)[0]
        })

        // Auto scroll into the table when user scrolls inside of it
        this.listen("scroll", () => {
            if(Math.round(this.root.getClientRects().item(0).top) != 0){
                scrollIntoElement(this.root)
            }
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

    private appendData(data: MatrixData){
        // Firstly calculate the total data to use it in the formulas
        let totalRowData: RowData = []
        data.forEach(rowData => rowData.forEach(
            (cellData, cellIndex) => {
                const feature = this.colFeatures[cellIndex]
                if(typeof cellData === "number" && feature?.type !== "text") {
                    if(feature.jsFormula)
                        totalRowData[cellIndex] = 0
                    else
                        totalRowData[cellIndex] = totalRowData[cellIndex]
                            ? numberOf(totalRowData[cellIndex]) + cellData
                            : cellData
                }
                else totalRowData[cellIndex] = ''
            })
        )
        totalRowData = this.applyFormulasToRowData(totalRowData)

        // let innerHtml = ""
        // data.forEach(rowData => innerHtml = innerHtml + this.createHtmlRowText(this.applyFormulasToRowData(rowData)))
        this.tbody.innerHTML = data.map(rowData => this.createHtmlRowText(this.applyFormulasToRowData(rowData))).join('')

        if(data.length > 1)
            this.tfoot.innerHTML = this.createHtmlRowText(totalRowData)

        this.groupPrimaryCells()
        this.spanTotalPrimaryCells()
    }

    private applyFormulasToRowData(rowData: RowData, totalRowData: RowData = rowData): RowData{
        this.colFeatures.forEach((feature, index) => {
            console.log("applyFormulasToRowData "+index)
            if(feature.type === "numeric" && feature.jsFormula){

                rowData[index] = executeFormulaForRowData(feature.jsFormula, rowData, totalRowData, this.data)
            }
        })
        return rowData
    }

    private createHtmlRowText(rowData: RowData){
        return `
            <tr>${rowData.map(
                (data, index) => 
                    this.colFeatures && this.colFeatures[index] 
                        ? this.createHtmlCellText(index, rowData) 
                        : `<td>${data}</td>`
                ).join('')}
            </tr>`
    }

    private createHtmlCellText(cellIndex: number, rowData: RowData){
        const feature = this.colFeatures[cellIndex]
        const cellData = rowData[cellIndex]
        if(feature){
            return `
                <td class="${feature.type}${this.model.primaryColumnsNumber > cellIndex ? ' primary' : ''}" 
                    ${feature.type === "numeric" && feature.colored
                        ? `style="color: ${cellData >= 0 ? 'var(--positive-color)' : 'var(--negative-color)'}"`
                        : ''}>
                    ${cellData}
                </td>`
        }
    }

    private applyFilter(htmlHeadCell: HTMLTableCellElement){
        htmlHeadCell.append(
            new TextInput("🔎", value => {
                this.filtersMap.set(getCellIndexWithSpans(htmlHeadCell), value)
                // TODO implement
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

    private spanTotalPrimaryCells(){
        this.tfoot.querySelectorAll<HTMLTableCellElement>("tr td.primary").forEach((td, index) => {
            if(index === 0) {
                td.colSpan = this.model.primaryColumnsNumber
                td.textContent = "Итого"
            }
            else td.remove()
        })
    }

    private groupPrimaryCells0(size: number = this.model.groupedColumnsNumber ? this.model.groupedColumnsNumber : 0,
                              startHtmlRow: HTMLTableRowElement = this.tbody.firstElementChild as HTMLTableRowElement,
                              endHtmlRow: HTMLTableRowElement = this.tbody.lastElementChild as HTMLTableRowElement,
                              nesting: number = 0){
        if(startHtmlRow === endHtmlRow || size === nesting) return
        const primaryHtmlCell= startHtmlRow.cells[nesting]
        if(!primaryHtmlCell?.classList?.contains("primary")) return
        let nextHtmlRow = startHtmlRow
        do {
            nextHtmlRow = nextHtmlRow.nextElementSibling as HTMLTableRowElement
            const nextPrimaryHtmlCell = nextHtmlRow.cells[nesting]
            if(primaryHtmlCell.textContent === nextPrimaryHtmlCell.textContent){
                primaryHtmlCell.rowSpan++
                nextPrimaryHtmlCell.hidden = true
            } else {
                this.groupPrimaryCells0(size, startHtmlRow, nextHtmlRow, nesting + 1)
                this.groupPrimaryCells0(size, nextHtmlRow, endHtmlRow)
                return
            }
        }
        while (nextHtmlRow !== endHtmlRow)
    }

    private groupPrimaryCells(startHtmlRow: HTMLTableRowElement = this.tbody.querySelector("tr:first-of-type") as HTMLTableRowElement,
                               endHtmlRow: HTMLTableRowElement = this.tbody.querySelector("tr:last-of-type") as HTMLTableRowElement,
                               nesting: number = 0){

        let htmlRowMarshall: HTMLTableRowElement
        let lastPrimaryCell: HTMLTableCellElement
        const marshallNextNesting=() => {
            if(lastPrimaryCell && nesting < this.model.groupedColumnsNumber - 1)
                this.groupPrimaryCells(lastPrimaryCell.parentElement as HTMLTableRowElement, htmlRowMarshall, nesting + 1)
        }
        while (htmlRowMarshall !== endHtmlRow){
            htmlRowMarshall = htmlRowMarshall ? htmlRowMarshall.nextElementSibling as HTMLTableRowElement : startHtmlRow
            const currentPrimaryCell = htmlRowMarshall.cells[nesting]
            if(lastPrimaryCell && lastPrimaryCell.textContent === currentPrimaryCell?.textContent){
                lastPrimaryCell.rowSpan++
                currentPrimaryCell.hidden = true
            }
            else {
                marshallNextNesting()
                lastPrimaryCell = htmlRowMarshall.querySelectorAll<HTMLTableCellElement>("td.primary")[nesting]
            }
        }
        marshallNextNesting()
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
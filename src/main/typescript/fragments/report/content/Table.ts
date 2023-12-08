import {emptyElement, scrollIntoElement} from "../../../util/domWizard"
import {filterMap, numberOf} from "../../../util/data"
import {TextInput} from "../../inputs/TextInput"
import {resolveStyle} from "../../../util/resolver"
import {InlineFragment} from "../../InlineFragment"
import {Body} from "../Body"
import {XlsxAccessor} from "../../../api/XlsxAccessor"
import {executeFormulaForRowData} from "../../../util/DANGEROUS"
import {SelectField} from "../../form/section/field/SelectField"

resolveStyle("table")

export class Table extends InlineFragment<Body>{

    thead: HTMLTableSectionElement
    tbody: HTMLTableSectionElement
    tfoot: HTMLTableSectionElement

    // Key is filtrated column, value is filter text value
    private filtersMap: Map<number, string> = new Map()

    readonly xlsxAccessor: XlsxAccessor

    constructor(body: Body,
                private readonly data: MatrixData,
                private readonly colFeatures: ColumnMeta[],
                private readonly model: TableColumnMeta)
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
        if(model.title) this.head = model.title
        if(data && data.length > 0) this.appendData(data)
        this.xlsxAccessor = new XlsxAccessor({
            name:    this.parent.parent.head.title,
            context: this.parent.context?.visibleValues,
            title:   this.parent.parent.head.title,
            head:  getCompleteRowsFromElement(this.thead),
            body:    getCompleteRowsFromElement(this.tbody),
            total:   getCompleteRowsFromElement(this.tfoot)[0]
        })

        this.addScrollHelper()
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
                const feature = this.colFeatures?.[cellIndex]
                if(typeof cellData === "number" && feature?.type !== "text") {
                    if(feature?.formula)
                        totalRowData[cellIndex] = 0
                    else
                        totalRowData[cellIndex] = totalRowData[cellIndex]
                            ? numberOf(totalRowData[cellIndex]) + cellData
                            : cellData
                }
                else totalRowData[cellIndex] = ''
            })
        )
        totalRowData = this.applyFeaturesToRowData(totalRowData)

        this.tbody.innerHTML = data.map(rowData => this.createHtmlRowText(this.applyFeaturesToRowData(rowData))).join('')

        if(data.length > 1)
            this.tfoot.innerHTML = this.createHtmlRowText(totalRowData)

        this.groupPrimaryCells()
        this.spanTotalPrimaryCells()
    }

    private applyFeaturesToRowData(rowData: RowData, totalRowData: RowData = rowData): RowData{
        this.colFeatures?.forEach((feature, index) => {
            if(feature.type === "numeric" && feature.formula){
                rowData[index] = executeFormulaForRowData(feature.formula, rowData, totalRowData, this.data)
            } else if(feature.type === "text"){
                feature.useOptions?.fromFields?.forEach(fieldKey => {
                    const field = this.parent.parent.associatedFormSnapshot.fields.get(fieldKey)
                    const fieldValue = field ? (field as SelectField).options.get(`${rowData[index]}`) : undefined
                    if(fieldValue) rowData[index] = fieldValue
                })
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
                <td class="${feature.type}${this.model.primaryColumns > cellIndex ? ' primary' : ''}" 
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
                td.colSpan = this.model.primaryColumns
                td.textContent = "Итого"
            }
            else td.remove()
        })
    }

    private groupPrimaryCells(startHtmlRow: HTMLTableRowElement = this.tbody.querySelector("tr:first-of-type") as HTMLTableRowElement,
                               endHtmlRow: HTMLTableRowElement = this.tbody.querySelector("tr:last-of-type") as HTMLTableRowElement,
                               nesting: number = 0){

        let htmlRowMarshall: HTMLTableRowElement
        let lastPrimaryCell: HTMLTableCellElement
        const marshallNextNesting=() => {
            if(lastPrimaryCell && nesting < this.model.groupBy - 1)
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

    private addScrollHelper(){
        let mouseIsInside = false
        // Auto scroll into the table when user scrolls inside of it
        this.listen("scroll", () => {
            if(mouseIsInside && Math.round(this.root.getClientRects().item(0).top) != 0){
                scrollIntoElement(this.root)
            }
        })

        this.listen("mouseenter", () => mouseIsInside = true)
        this.listen("mouseleave", () => mouseIsInside = false)
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
    return result
}

function getCompleteRowsFromElement(element: Element): CompleteRow[]{
    let rows: CompleteRow[] = []
    element.querySelectorAll("tr").forEach(tr => {
        let row: CompleteRow = []
        tr.querySelectorAll<HTMLTableCellElement>("td, th").forEach(tc => {
            if(!tc.hidden) {
                row.push({
                    value: tc.innerText.trim(),
                    colspan: tc.colSpan,
                    rowspan: tc.rowSpan
                })
            }
        })
        rows.push(row)
    })
    return rows
}
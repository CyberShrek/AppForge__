import {ReportWizard} from "../../ReportWizard"
import {convertHtmlTableSectionToCompleteRows} from "../../../../../util/domWizard"
import {tableText} from "../../../../../properties"
import _default from "chart.js/dist/core/core.interaction"

export class TableWizard {

    // Flattened origin column metas for faster and easier access to them.
    // Column titles packed in arrays where each index is level of header nesting
    readonly columnMetas: (ColumnMeta & {parentTitles: string[]})[] = []

    // model data modified by formulas and ready-to-use in the table
    readonly data: MatrixData

    // The primary columns are the most left columns consist of "string" type cells
    readonly primaryColumnsNumber: number

    readonly headSize: number
    readonly pageSize = this.config.labelize ? 20 : 50

    readonly hasCheckboxes = !!this.config.checkboxAction
    readonly hasGrouping = !!this.config.group
    readonly hasTotal = !!this.config.total

    // Executes formulas for given origin row and returns ready-to-use result
    readonly prepareRow: (originRow: RowData) => RowData

    constructor(private readonly report: ReportWizard,
                private readonly config: TableConfig,
                private readonly rootElement: HTMLElement) {

        const fillColumnMetas = (metas: typeof this.config.columns,
                                 // Parent column titles
                                 parentTitles: string[] = []) => {
            metas.forEach(column => {
                const childColumns = (column as ComplexColumnMeta).columns
                if(childColumns)
                    fillColumnMetas(childColumns, [...parentTitles, column.title])
                else
                    this.columnMetas.push({parentTitles, ...column})
            })
        }
        fillColumnMetas(config.columns)
        this.headSize = Math.max(...this.columnMetas.map(meta => meta.parentTitles.length + 1))

        // Assign Function which executes all the given formulas in a row
        const formulasFunction = new Function(
            ...report.model.dataDefine,
            `return [${this.columnMetas.map(meta => meta.formula).join()}]`
        )
        this.prepareRow = (originRow: RowData) => formulasFunction(...originRow)

        // Calculate data
        this.data = report.model.data.map(row => this.prepareRow(row))

        // Find primary columns number
        let primaryColumnsNumber = 0
        this.data.forEach(row => {
            for (let i = 1; i <= row.length; i++) {
                if (typeof row[i - 1] !== "string") break
                if (i > primaryColumnsNumber) primaryColumnsNumber = i
            }
        })
        this.primaryColumnsNumber = primaryColumnsNumber
    }

    get htmlTable() {return this.rootElement.querySelector("table")}
    get htmlHead() {return this.htmlTable.tHead}
    get htmlFoot() {return this.htmlTable.tFoot}
    get htmlBody() {return this.htmlTable.tBodies[0]}


    splitRowIndicesByColumnIndex(rowsI: number[], colIndex: number): number[][]{
        const result: number[][] = []
        let prevColValue: CellData

        rowsI.forEach(rowI => {
            const colValue = this.data[rowI][colIndex]
            if (prevColValue !== colValue){
                result.push([])
                prevColValue = colValue
            }
            result[result.length - 1].push(rowI)
        })

        return result
    }

    // Calculate total row for the given row indices
    getTotalRowForIndices(rowsI: number[]): RowData{
        const rawTotalData = []
        rowsI.forEach(rowI => {
            this.data[rowI].forEach((nextCellData, cellI) => {
                rawTotalData[cellI] =
                    !rawTotalData[cellI]
                    || typeof rawTotalData[cellI] !== typeof nextCellData
                    || (typeof nextCellData === "string" && rawTotalData[cellI] === nextCellData) ?
                        nextCellData :
                        cellI < this.primaryColumnsNumber ?
                            tableText.total :
                            typeof nextCellData === "number" ?
                                rawTotalData[cellI] + nextCellData :
                                typeof nextCellData === "boolean" ?
                                    Boolean(rawTotalData[cellI] + nextCellData) :
                                    typeof nextCellData === "object" && Array.isArray(nextCellData) ?
                                        [...rawTotalData[cellI], ...nextCellData] :
                                        ""
            })
        })
        return this.prepareRow(rawTotalData)
    }

    createXlsxModel(): XlsxTableModel{
        return {
            title: this.report.model.config.title,
            context: this.report.visibleContextValues,
            head:  convertHtmlTableSectionToCompleteRows(this.htmlHead),
            body: [
                ...convertHtmlTableSectionToCompleteRows(this.htmlBody),
                ...convertHtmlTableSectionToCompleteRows(this.htmlFoot)
            ]
        }
    }

    spanHtmlBodyColumn(columnI: number,
                       rowStartI = 0,
                       rowEndI = this.htmlBody.rows.length) {

        console.log(columnI, rowStartI, rowEndI)

        const getCell = (rowI: number): HTMLTableCellElement => this.htmlBody.rows[rowI]?.cells[columnI]

        for (let rowI = rowStartI + 1; rowI <= rowEndI; rowI++) {
            const cell = getCell(rowI)
            // cell.textContent += "+"
        }
    }

    postprocessHead() {

    }

    postprocessFoot() {

    }

    postprocessBody() {
        // spanColumn([...this.htmlTable.tBodies[0].rows], Number(this.hasCheckboxes))
        this.spanPrimaryColumns()
    }

    private spanPrimaryColumns(){
        const
            primaryCells: HTMLTableCellElement[] = new Array(this.primaryColumnsNumber),
            rowSpans: number[] = new Array(this.primaryColumnsNumber)

        Array.of(...this.htmlTable.tBodies[0].rows).forEach(row => {
            for (let i = 0; i < this.primaryColumnsNumber; i++) {
                const primaryCell = row.cells[i + Number(this.hasCheckboxes)]
                if (primaryCells[i]?.innerText === primaryCell.innerText){
                    rowSpans[i] = (rowSpans[i] ?? 1) + 1
                    primaryCell.hidden = true
                } else {
                    primaryCell.hidden = false
                    if(primaryCells[i])
                        primaryCells[i].rowSpan = rowSpans[i] ?? 1
                    primaryCells[i] = primaryCell
                    rowSpans[i] = 1
                }
            }
        })
    }


    private getPrimaryCellsJoined = (row: RowData): string => row.slice(0, this.primaryColumnsNumber).join()
}

function spanColumn(htmlRows: HTMLTableRowElement[], columnI: number){
    htmlRows
}
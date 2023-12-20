import {ReportWizard} from "../ReportWizard"
import {convertHtmlTableSectionToCompleteRows} from "../../../../util/domWizard"
import {tableText} from "../../../../properties"
import {valueOrDefault} from "../../../../util/data";
import _default from "chart.js/dist/core/core.interaction";
import modes = _default.modes;

export class TableWizard {

    // Flattened origin column metas for faster and easier access to them.
    // Column titles packed in arrays where each index is level of header nesting
    readonly columnMetas: (ColumnMeta & {parentTitles: string[]})[] = []

    // model data modified by formulas and ready-to-use in the table
    readonly data: MatrixData

    // The primary columns are the most left columns consist of "string" type cells
    readonly primaryColumnsNumber: number

    // The number of rows in each page
    readonly pageSize = this.config.labelize ? 20 : 50

    // Number of rows for header cells. Depends on columns complexity
    readonly headSize: number = 1

    //
    readonly firstInnerTotalIndex: number

    // Executes formulas for given origin row and returns ready-to-use result
    readonly prepareRow: (originRow: RowData) => RowData

    constructor(private readonly report: ReportWizard,
                readonly config: TableConfig,
                private readonly rootElement: HTMLElement) {

        // Flat the origin column metas
        this.flatColumnMetas(config.columns)

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

        this.firstInnerTotalIndex = this.columnMetas.findIndex(meta => meta?.totalize)
    }

    // Split the matrix into groups by the given colIndex.
    // Return an array of matrices where each matrix is a group.
    splitMatrixByColIndex(matrix: MatrixData, colIndex: number): MatrixData[]{
        let result: MatrixData[] = [],
            prevColValue: CellData

        matrix.forEach(row => {
            const colValue = row[colIndex]
            if (prevColValue !== colValue){
                result.push([])
                prevColValue = colValue
            }
            result[result.length - 1].push(row)
        })
        return result
    }

    getGroupedIndices(colIndex: number): number[][]{

    }

    // Calculate total row for the given row indices
    getTotal(rowsI: number[]): RowData{

        const total = []

        rowsI.forEach(rowI => {
            this.data[rowI].forEach((cell, cellI) => {
                if(typeof cell === 'number'){
                    total[cellI] = (total[cellI] ?? 0) + cell
                }
                else total[cellI] = tableText.foot.total
            })
        })

        return total
    }

    postprocessHead() {

    }

    postprocessFoot() {

    }

    postprocessBody() {

    }

    createXlsxModel(): XlsxTableModel{
        const htmlTable = this.rootElement.querySelector("table")
        return {
            title: this.report.model.config.title,
            context: this.report.visibleContextValues,
            head:  convertHtmlTableSectionToCompleteRows(htmlTable.tHead),
            body: [
                ...convertHtmlTableSectionToCompleteRows(htmlTable.tBodies[0]),
                ...convertHtmlTableSectionToCompleteRows(htmlTable.tFoot)
            ]
        }
    }

    private flatColumnMetas = (metas: typeof this.config.columns,
                               parentTitles: string[] = [] // Parent column titles
    ) => {
        metas.forEach(column => {
            const childColumns = (column as ComplexColumnMeta).columns
            if(childColumns)
                this.flatColumnMetas(childColumns, [...parentTitles, column.title])
            else
                this.columnMetas.push({parentTitles, ...column})
        })
    }

    private getPrimaryCellsJoined = (row: RowData): string => row.slice(0, this.primaryColumnsNumber).join()
}
import {ReportModelWizard} from "../ReportModelWizard"
import {convertHtmlTableSectionToCompleteRows} from "../../../../util/domWizard"
import {tableText} from "../../../../properties";
export class TableWizard {

    // The primary columns are the most left columns consist of "string" type cells
    readonly primaryColumnsNumber: number
    readonly columnMetas = this.modelWizard.tableColumnMetas
    readonly pageSize = this.config.labelize ? 20 : 50

    // Some boolean properties for convenience
    readonly hasCheckboxes = !!this.config.checkboxButtons

    readonly data = this.modelWizard.data.map(rowData => {
        const tableRowData: RowData = []
        rowData.forEach(cell)
    })

    filteredData: MatrixData = []

    constructor(private readonly modelWizard: ReportModelWizard,
                private readonly config: TableConfig) {

        // Find primary columns number
        let primaryColumnsNumber = 0
        this.modelWizard.data.forEach(row => {
            for (let i = 1; i <= row.length; i++) {
                if (typeof row[i - 1] !== "string") break
                if (i > primaryColumnsNumber) primaryColumnsNumber = i
            }
        })
        this.primaryColumnsNumber = primaryColumnsNumber
    }

    // Filtrate the properData by given filter values where each value refers to each column and apply the result to filteredData.
    // Return filteredData
    filtrateData(filterValues: string[]): MatrixData {
        return this.filteredData = this.data.filter(row =>
            filterValues.every((filterValue, index) =>
                filterValue === undefined
                || filterValue === ""
                || String(row[index]).toLowerCase().includes(filterValue.toLowerCase())
            )
        )
    }

    // Split the matrix into groups by the given colIndex.
    // Return an array of matrices where each matrix is a group.
    splitMatrixByColIndex(matrix: MatrixData, colIndex: number): MatrixData[]{
        let result: MatrixData[] = [],
            prevColValue: string | number

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

    // Calculate total row for the given data
    getMatrixTotal(matrix: MatrixData, primaryColumnI: number = this.primaryColumnsNumber - 1): RowData{
        return this.modelWizard.getMatrixTotal(matrix)
            .map((cellData, index) =>
                index <= primaryColumnI ? matrix[0][index]
                    : index < this.primaryColumnsNumber ? tableText.foot.total
                        : cellData
            )
    }

    // Split the data into pages with the given pageSize
    splitData(data: MatrixData, pageSize: number = data.length): MatrixData[]{
        let result: MatrixData[] = []
        for (let i = 0; i < data.length; i += pageSize)
            result.push(data.slice(i, i + pageSize))
        return result
    }

    convertHtmlTableToXlsxModel(htmlTable: HTMLTableElement): XlsxTableModel{
        return {
            title: this.modelWizard.model.config.title,
            context: this.modelWizard.visibleContextValues,
            head:  convertHtmlTableSectionToCompleteRows(htmlTable.tHead),
            body: [
                ...convertHtmlTableSectionToCompleteRows(htmlTable.tBodies[0]),
                ...convertHtmlTableSectionToCompleteRows(htmlTable.tFoot)
            ]
        }
    }
}
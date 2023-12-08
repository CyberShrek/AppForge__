import {ReportModelWizard} from "../../../../model/ReportModelWizard"
import {tableTotalWord} from "../../../../properties"
import {convertHtmlTableSectionToCompleteRows, swapElements} from "../../../../util/domWizard"
import {numberOf, valueOrDefault} from "../../../../util/data";

export class TableWizard {

    // The primary columns are the most left columns consist of "string" type cells
    readonly primaryColumnsNumber: number
    readonly columnMetas = this.modelWizard.tableColumnMetas
    readonly pageSize = this.config.labelize ? 20 : 50

    // Some boolean properties for convenience
    readonly hasCheckboxes = !!this.config.checkboxButtons

    constructor(private readonly modelWizard: ReportModelWizard,
                private readonly config: TableConfig) {

        // Find primary columns number
        let primaryColumnsNumber = 0
        this.modelWizard.properData.forEach(row => {
            for (let i = 1; i <= row.length; i++) {
                if (typeof row[i - 1] !== "string") break
                if (i > primaryColumnsNumber) primaryColumnsNumber = i
            }
        })
        this.primaryColumnsNumber = primaryColumnsNumber
    }

    // Splits the matrix into groups by the given colIndex. Returns an array of matrices where each matrix is a group.
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

    // Calculates total row for the given data
    getMatrixTotal(matrix: MatrixData, primaryColumnI: number = this.primaryColumnsNumber - 1): RowData{
        return this.modelWizard.getMatrixTotal(matrix)
            .map((cellData, index) =>
                index <= primaryColumnI ? matrix[0][index]
                    : index < this.primaryColumnsNumber ? tableTotalWord
                        : cellData
            )
    }

    getFiltratedData(filterValues: string[]): MatrixData{
        return this.modelWizard.properData.filter(row => {
            return filterValues.every((filterValue, index) => {
                return filterValue === undefined
                    || filterValue === ""
                    || String(row[index]).toLowerCase().includes(filterValue.toLowerCase())
            })
        })
    }

    // Splits the data into pages with the given pageSize
    splitData(data: MatrixData, pageSize: number = data.length): MatrixData[]{
        let result: MatrixData[] = []
        for (let i = 0; i < data.length; i += pageSize)
            result.push(data.slice(i, i + pageSize))
        return result
    }

    convertHtmlTableToXlsxModel(htmlTable: HTMLTableElement): XlsxTableModel{
        return {
            title: this.modelWizard.model.title,
            context: this.modelWizard.visibleContextValues,
            head:  convertHtmlTableSectionToCompleteRows(htmlTable.tHead),
            body: [
                ...convertHtmlTableSectionToCompleteRows(htmlTable.tBodies[0]),
                ...convertHtmlTableSectionToCompleteRows(htmlTable.tFoot)
            ]
        }
    }
}
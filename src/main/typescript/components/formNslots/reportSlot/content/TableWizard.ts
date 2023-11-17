import {ReportModelWizard} from "../../../../model/ReportModelWizard"
import {tableTotalWord} from "../../../../properties"
import {swapElements} from "../../../../util/domWizard"
import {numberOf, valueOrDefault} from "../../../../util/data";

export class TableWizard {

    // The primary columns are the most left columns consist of "string" type cells
    primaryColumnsNumber: number = 0
    tableWidth: number = 0

    constructor(private modelWizard: ReportModelWizard,
                private config: TableConfig) {

        // Find primary columns number
        this.modelWizard.properData.forEach(row => {
            for (let i = 1; i <= row.length; i++) {
                if (typeof row[i - 1] !== "string") break
                if (i > this.primaryColumnsNumber) this.primaryColumnsNumber = i
            }
        })

        // Find table width. Head row with the largest cells count including cell spans is used
        config.head?.forEach(row => {
            let rowWidth = row.length
            row.forEach(cell => rowWidth += cell.colspan ? cell.colspan - 1 : 0)
            if (rowWidth > this.tableWidth)
                this.tableWidth = rowWidth
        })
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
    getMatrixTotal(matrix: MatrixData, primaryColumnIndex: number): RowData{
        return this.modelWizard.getMatrixTotal(matrix)
            .map((cellData, index) =>
                index <= primaryColumnIndex ? matrix[0][index]
                    : index < this.primaryColumnsNumber ? tableTotalWord
                        : cellData
            )
    }

    getFiltratedData(filterValues: string[]): MatrixData{
        return this.modelWizard.properData.filter(row => {
            return filterValues.every((filterValue, index) => {
                return filterValue === undefined
                    || filterValue === ""
                    || String(row[index]).includes(filterValue)
            })
        })
    }

    // Splits the data into pages with the given pageSize
    paginateData(data: MatrixData, pageSize: number = data.length): MatrixData[]{
        let result: MatrixData[] = []
        for (let i = 0; i < data.length; i += pageSize)
            result.push(data.slice(i, i + pageSize))
        return result
    }
}
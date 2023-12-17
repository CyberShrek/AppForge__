import {ReportModelWizard} from "../ReportModelWizard"
import {convertHtmlTableSectionToCompleteRows} from "../../../../util/domWizard"
import {tableText} from "../../../../properties"
import {valueOrDefault} from "../../../../util/data";

export class TableWizard {

    // The primary columns are the most left columns consist of "string" type cells
    readonly primaryColumnsNumber: number

    // The number of rows in each page
    readonly pageSize = this.config.labelize ? 20 : 50

    // If column meta for the table is not found then null will be added
    readonly columnMetas: TableColumnConfig[] = Object.values(this.modelWizard.model.config.columns)
        .map(meta => meta.inTable ? meta.inTable : null)

    readonly hasTotal = this.config.total

    readonly hasCheckboxes = !!this.config.checkboxButtons

    readonly firstInnerTotalIndex = this.columnMetas.findIndex(meta => meta?.totalize)

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

        this.mappedComparisonData = new Map(this.modelWizard.model.comparisonData
            .map(row => [
                this.getPrimaryCellsJoined(row),
                row
            ])
        )
    }

    // Return filtrated properData by given filter values where each value refers to each column
    filtrateData(filterValues: string[]): MatrixData {
        return this.modelWizard.properData.filter(row =>
            filterValues.every((filterValue, index) =>
                filterValue === undefined
                || filterValue === ""
                || String(row[index]).toLowerCase().includes(filterValue.toLowerCase())
            )
        )
    }
    // Needed to quickly find comparison rows
    private readonly mappedComparisonData: Map<string, RowData>

    // Return comparison row equal to given row by primary cells. If not found, returns empty row
    getComparisonRow(row: RowData): RowData {
        return valueOrDefault(this.mappedComparisonData.get(this.getPrimaryCellsJoined(row)), [])
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

    // Split the data into pages with this.pageSize
    splitDataIntoPages(data: MatrixData): MatrixData[]{
        let result: MatrixData[] = []
        for (let i = 0; i < data.length; i += this.pageSize)
            result.push(data.slice(i, i + this.pageSize))
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

    private getPrimaryCellsJoined = (row: RowData): string => row.slice(0, this.primaryColumnsNumber).join()
}
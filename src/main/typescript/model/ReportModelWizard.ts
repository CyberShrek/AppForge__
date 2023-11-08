import {deepCopyOf, numberOf, valueOrDefault} from "../util/data"
import {executeFormulaForRowData} from "../util/DANGEROUS"
import {popupMessage} from "../util/alert"

export class ReportModelWizard {

    readonly properData: MatrixData        // properData is model.data modified by formulas and sorted by primary columns.
    readonly primaryColumnsNumber: number  // The primary columns are the most left columns consist of "string" type cells
    readonly totalRow: RowData

    constructor(private model: ReportModel) {
        if(model.data && model.data.length > 0) {

            // Firstly calculate the total data to use it in the formulas
            this.totalRow = this.getClusterTotal(model.data, false)
            this.applyFormulasToRow(this.totalRow)

            // Then calculate the proper data and find primary columns
            this.properData = deepCopyOf(model.data)
            let primaryColumnsNumber = 0
            this.properData.forEach(row => {
                for (let i = 1; i <= row.length; i++) {
                    if (typeof row[i - 1] !== "string") break
                    if (i > primaryColumnsNumber) primaryColumnsNumber = i
                }
                this.applyFormulasToRow(row)
            })
            this.primaryColumnsNumber = primaryColumnsNumber
            this.sortCluster(this.properData)
        }
        else popupMessage("Отчёт пуст", "Отсутствуют подходящие данные")
    }

    getClusterTotal(cluster: MatrixData, applyFormulas: boolean = true): RowData{
        let total: RowData = []

        cluster.forEach(rowData => rowData.forEach(
            (cellData, cellIndex) => {
                if(typeof cellData === "number") {
                    total[cellIndex] = total[cellIndex]
                        ? numberOf(total[cellIndex]) + cellData
                        : cellData
                }
                else total[cellIndex] = valueOrDefault(total[cellIndex], '')
            })
        )
        if(applyFormulas)
            this.applyFormulasToRow(total)

        return total
    }

    // Sorts data by primary columns
    sortCluster(cluster: MatrixData){
        cluster.sort((rowA, rowB) => {
            for (let i = 0; i < this.primaryColumnsNumber; i++) {
                if (rowA[i] !== rowB[i]) {
                    return String(rowA[i]).localeCompare(String(rowB[i]));
                }
            }
            return 0;
        })
    }

    private applyFormulasToRow(row: RowData) {
        this.model.formulas?.forEach((formula, index) => {
            if(formula && formula.length > 0)
                row[index] = executeFormulaForRowData(formula, row, this.totalRow, this.model.data)
        })
    }
}
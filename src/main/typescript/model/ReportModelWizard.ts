import {deepCopyOf, numberOf, valueOrDefault} from "../util/data"
import {executeFormulaForRowData} from "../util/DANGEROUS"
import {popupMessage} from "../util/alert"

export class ReportModelWizard {

    readonly properData: MatrixData // properData is model.data modified by formulas and sorted.
    readonly totalRow: RowData

    constructor(private model: ReportModel) {
        if(model.data && model.data.length > 0) {

            // Firstly calculate the total data to use it in the formulas
            this.totalRow = this.getMatrixTotal(model.data, false)
            this.applyFormulasToRow(this.totalRow)

            // Then calculate the proper data and find primary columns
            this.properData = deepCopyOf(model.data)
            this.properData.forEach(row => this.applyFormulasToRow(row))
            this.properData.sort()
        }
        else popupMessage("Отчёт пуст", "Отсутствуют подходящие данные")
    }


    // Calculates total row for the given data
    getMatrixTotal(matrix: MatrixData, applyFormulas: boolean = true): RowData{
        let total: RowData = []

        matrix.forEach(rowData => rowData.forEach(
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

    private applyFormulasToRow(row: RowData) {
        this.model.formulas?.forEach((formula, index) => {
            if(formula && formula.length > 0)
                row[index] = executeFormulaForRowData(formula, row, this.totalRow, this.model.data)
        })
    }
}
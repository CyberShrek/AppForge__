import {deepCopyOf, numberOf, valueOrDefault} from "../util/data"
import {executeFormulaForRowData} from "../util/DANGEROUS"
import {popupMessage} from "../util/alert"

export class ReportModelWizard {

    readonly properData: MatrixData // properData is model.data modified by formulas and sorted.
    readonly totalRow: RowData
    readonly visibleContextValues: string[]

    constructor(readonly model: ReportModel) {
        if(model.data && model.data.length > 0) {

            // Firstly calculate the total data to use it in the formulas
            this.totalRow = this.getMatrixTotal(model.data, false)
            this.applyFormulasToRow(this.totalRow)

            // Then calculate the proper data and find primary columns
            this.properData = deepCopyOf(model.data)
            this.properData.forEach(row => this.applyFormulasToRow(row))
            this.properData.sort()

            // Find visible context values by associated fields with used values
            if (model.context?.fields && model.usedValues)
            this.visibleContextValues = Object.entries(model.context.fields)
                .map(([fieldKey, fieldNaturalName]) => fieldNaturalName + ":\t" + model.usedValues[fieldKey])
        }
        else {
            this.properData = []
            this.totalRow = []
            this.visibleContextValues = []
            popupMessage("Отчёт пуст", "Отсутствуют подходящие данные")
        }
    }


    // Calculates total row for the given data
    getMatrixTotal(matrix: MatrixData, applyFormulas: boolean = true): RowData{
        let total: RowData = []

        for(const rowData of matrix){
            rowData.forEach(
                (cellData, cellIndex) => {
                    if(typeof cellData === "number") {
                        total[cellIndex] = total[cellIndex]
                            ? numberOf(total[cellIndex]) + cellData
                            : cellData
                    }
                    else total[cellIndex] = valueOrDefault(total[cellIndex], '')
                }
            )
        }
        if(applyFormulas)
            this.applyFormulasToRow(total)

        return total
    }

    private applyFormulasToRow(row: RowData) {
        // The copy is used to avoid changing the original data
        const rowCopy = [...row]
        this.model.formulas?.forEach((formula, i) => {
            if(formula && formula.length > 0)
                row[i] = executeFormulaForRowData(formula, i, rowCopy, this.totalRow)
        })
    }
}
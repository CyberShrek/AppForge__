import {deepCopyOf, numberOf, valueOrDefault} from "../util/data"
import {executeFormulaForRowData} from "../util/DANGEROUS"
import {popupMessage} from "../util/alert"
import Decimal from "decimal.js";

export class ReportModelWizard {

    readonly properData: MatrixData         = [] // properData is model.data modified by formulas and sorted.
    readonly totalRow: RowData              = []
    readonly visibleContextValues: string[] = []

    constructor(readonly config: ReportSlotConfig, readonly model: ReportModel) {
        if(model.data?.length > 0) {
            // Firstly calculate the total data to use it in the formulas
            this.totalRow = this.getMatrixTotal(model.data, false)
            this.applyFormulasToRow(this.totalRow)

            // Then calculate the proper data and find primary columns
            this.properData = deepCopyOf(model.data)
            this.properData.forEach(row => this.applyFormulasToRow(row))

            // Find visible context values by associated fields with used values
            if (model.context?.fields && model.usedValues)
            this.visibleContextValues = Object.entries(model.context.fields)
                .map(([fieldKey, fieldNaturalName]) => fieldNaturalName + ":\t" + model.usedValues[fieldKey])

            if(!model.title)
                model.title = config.title
        }
    }


    // Calculates total row for the given data
    getMatrixTotal(matrix: MatrixData, applyFormulas: boolean = true): RowData{
        let total: RowData = []

        for(const rowData of matrix){
            rowData.forEach(
                (cellData, cellIndex) => {
                    if(typeof cellData === "number") {
                        console.log(`${total[cellIndex]} + ${cellData} = `)
                        total[cellIndex] = total[cellIndex]
                            ? new Decimal(total[cellIndex]).plus(cellData).toNumber()
                            : cellData
                        console.log(`\t${total[cellIndex]}`)
                    }
                    else total[cellIndex] = valueOrDefault(total[cellIndex], '')
                }
            )
        }
        if(applyFormulas)
            this.applyFormulasToRow(total, true)

        return total
    }

    private applyFormulasToRow(row: RowData, isTotalRow: boolean = false) {
        // The copy is used to avoid changing the original data
        const rowCopy = [...row]
        this.model.formulas?.forEach((formula, i) => {
            if(formula && formula.length > 0)
                row[i] = executeFormulaForRowData(formula, i, rowCopy, this.totalRow, isTotalRow)
        })
    }
}
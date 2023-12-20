import {deepCopyOf, valueOrDefault} from "../../../util/data"
import Decimal from "decimal.js"

export class ReportWizard {

    readonly totalRow: RowData              = []
    readonly averageRow: RowData            = []
    readonly visibleContextValues: string[] = []

    readonly isModal = !this.model.slot

    // private readonly formulaFunctions: Function[] = Object.values(this.model.config?.columns ?? {})
    //     .map(column =>
    //         column.formula?.length > 0 ?
    //             new Function(
    //                 ...this.columnNames,
    //                 `return ${column.formula}`
    //             )
    //             : null )

    constructor(readonly model: ReportModel) {
        if(model.data?.length > 0) {

            // Find visible context values by associated fields with used values
            if (model.config.context?.fields && model.usedValues)
            this.visibleContextValues = Object.entries(model.config.context.fields)
                .map(([fieldKey, fieldNaturalName]) => fieldNaturalName + ":\t" + model.usedValues[fieldKey])

        }
    }

    // private applyFormulasToRow(row: RowData) {
    //     // The copy is used to avoid changing the original data
    //     const rowCopy = [...row]
    //     this.formulaFunctions.forEach((formula, i) => {
    //         if(formula) {
    //             row[i] = formula(...rowCopy)
    //         }
    //     })
    // }
}
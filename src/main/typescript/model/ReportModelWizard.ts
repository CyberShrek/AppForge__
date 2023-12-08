import {deepCopyOf, valueOrDefault} from "../util/data"
import Decimal from "decimal.js"

export class ReportModelWizard {

    readonly properData: MatrixData         = [] // properData is model.data modified by formulas
    readonly totalRow: RowData              = []
    readonly averageRow: RowData            = []
    readonly visibleContextValues: string[] = []

    // Key of the columns meta used in the formulas and associated with the columns data
    readonly columnNames:        string[] = Object.keys(this.model.columns)

    readonly chartMetas: ChartMeta[] = []
    readonly labelMetas: LabelMeta[] = []
    readonly tableColumnMetas: TableColumnMeta[] = []

    private readonly formulaFunctions: Function[] = Object.values(this.model.columns)
        .map(column =>
            column.formula?.length > 0 ?
                new Function(
                    ...this.columnNames,
                    `return ${column.formula}`
                )
                : null )

    constructor(readonly config: ReportSlotConfig, readonly model: ReportModel) {
        if(model.data?.length > 0) {

            // Calculate the total and average to use them in the formulas
            this.totalRow   = this.getMatrixTotal(model.data, false)
            this.averageRow = this.totalRow.map(cellData => typeof cellData === "number" ? cellData/this.totalRow.length : cellData)
            this.applyFormulasToRow(this.totalRow)
            this.applyFormulasToRow(this.averageRow)

            // Calculate the proper data
            this.properData = deepCopyOf(model.data)
            this.properData.forEach(row => this.applyFormulasToRow(row))

            // Distribute meta
            Object.values(model.columns).forEach(meta => {
                if(meta.inLabel) this.labelMetas.push(meta.inLabel)
                if(meta.inChart) this.chartMetas.push(meta.inChart)
                if(meta.inTable) this.tableColumnMetas.push(meta.inTable)
            })

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
                        total[cellIndex] = total[cellIndex]
                            ? new Decimal(total[cellIndex]).plus(cellData).toNumber()
                            : cellData
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
        this.formulaFunctions.forEach((formula, i) => {
            if(formula) {
                row[i] = formula(...rowCopy)
            }
        })
    }
}
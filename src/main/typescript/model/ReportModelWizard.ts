import {deepCopyOf, numberOf} from "../util/data"
import {executeFormulaForRowData} from "../util/DANGEROUS"

export class ReportModelWizard {

    readonly totalRow: RowData
    readonly propData: MatrixData

    constructor(
        private model: ReportModel,
        private getOptionsFn?: (fieldLocation: string) => OptionsMap // Used for finding labels
    ) {
        // Firstly calculate the total data to use it in the formulas
        this.totalRow = this.calculateClusterTotal(model.data, false)
        this.applyFeaturesToRow(this.totalRow, false)

        // Then calculate the proper data
        this.propData = deepCopyOf(model.data)
        this.propData.forEach(row => this.applyFeaturesToRow(row))
    }

    calculateClusterTotal(cluster: MatrixData, applyFormulas: boolean = true): RowData{
        let total: RowData = []

        cluster.forEach(rowData => rowData.forEach(
            (cellData, cellIndex) => {
                const feature = this.model.dataFeatures?.[cellIndex]
                if(typeof cellData === "number" && feature?.type !== "text") {
                    total[cellIndex] = total[cellIndex]
                        ? numberOf(total[cellIndex]) + cellData
                        : cellData
                }
                else total[cellIndex] = ''
            })
        )
        if(applyFormulas)
            this.applyFeaturesToRow(total, false)

        return total
    }

    private applyFeaturesToRow(row: RowData, applyLabels: boolean = true) {
        this.model.dataFeatures?.forEach((feature, index) => {
            if(feature.type === "numeric" && feature.formula){
                row[index] = executeFormulaForRowData(feature.formula, row, this.totalRow, this.model.data)
            }
            else if(applyLabels && this.getOptionsFn && feature.type === "text"){
                feature.useOptionLabels?.fromFields?.forEach(fieldLocation => {
                    const optionLabel = this.getOptionsFn(fieldLocation).get(`${row[index]}`)
                    if(optionLabel) {
                        const optionCode = row[index]
                        row[index] = optionLabel + feature.useOptionLabels.showCode ? optionCode : ''
                    }
                })
            }
        })
    }
}
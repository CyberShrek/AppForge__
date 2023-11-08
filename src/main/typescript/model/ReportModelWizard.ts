import {deepCopyOf, numberOf, valueOrDefault} from "../util/data"
import {executeFormulaForRowData} from "../util/DANGEROUS"
import {popupMessage} from "../util/alert"

export class ReportModelWizard {

    readonly totalRow: RowData
    readonly propData: MatrixData

    constructor(
        private model: ReportModel,
        private getOptionsFn?: (fieldLocation: string) => OptionsMap // Used for finding labels
    ) {
        if(model.data && model.data.length > 0) {
            // Firstly calculate the total data to use it in the formulas
            this.totalRow = this.calculateClusterTotal(model.data, false)
            this.applyFeaturesToRow(this.totalRow, false)

            // Then calculate the proper data
            this.propData = deepCopyOf(model.data)
            this.propData.forEach(row => this.applyFeaturesToRow(row))
        }
        else popupMessage("Отчёт пуст", "Отсутствуют подходящие данные")
    }

    getColumnType(columnId){
        return valueOrDefault(this.model?.columns?.[columnId]?.type, '')
    }

    calculateClusterTotal(cluster: MatrixData, applyFormulas: boolean = true): RowData{
        let total: RowData = []

        cluster.forEach(rowData => rowData.forEach(
            (cellData, cellIndex) => {
                const feature = this.model.columns?.[cellIndex]
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

    groupByFirstColumn(tbody: HTMLTableSectionElement){
        this.recursiveGroupPrimaryCells(tbody.querySelector("tr:first-of-type"), tbody.querySelector("tr:last-of-type"))
    }

    private recursiveGroupPrimaryCells(startHtmlRow: HTMLTableRowElement, endHtmlRow: HTMLTableRowElement, nesting: number = 0){

        let htmlRowMarshall: HTMLTableRowElement
        let lastPrimaryCell: HTMLTableCellElement

        const marshallNextNesting=() => {
            if(lastPrimaryCell)
                this.recursiveGroupPrimaryCells(lastPrimaryCell.parentElement as HTMLTableRowElement, htmlRowMarshall, nesting + 1)
        }
        while (htmlRowMarshall !== endHtmlRow){
            htmlRowMarshall = htmlRowMarshall ? htmlRowMarshall.nextElementSibling as HTMLTableRowElement : startHtmlRow
            const currentPrimaryCell = htmlRowMarshall.cells[nesting]
            if(lastPrimaryCell && lastPrimaryCell.textContent === currentPrimaryCell?.textContent){
                lastPrimaryCell.rowSpan++
                currentPrimaryCell.hidden = true
            }
            else {
                marshallNextNesting()
                lastPrimaryCell = htmlRowMarshall.querySelectorAll<HTMLTableCellElement>("td.primary")[nesting]
            }
        }
        marshallNextNesting()
    }

    private applyFeaturesToRow(row: RowData, applyLabels: boolean = true) {
        this.model.columns?.forEach((feature, index) => {
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
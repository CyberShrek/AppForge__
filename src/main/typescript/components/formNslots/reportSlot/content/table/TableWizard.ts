import {ReportModelWizard} from "../../../../../model/ReportModelWizard";

export class TableWizard {

    // The primary columns are the most left columns consist of "string" type cells
    primaryColumnsNumber: number = 0

    constructor(private modelWizard: ReportModelWizard,
                private config: TableConfig) {

        // Find primary columns number
        this.modelWizard.properData.forEach(row => {
            for (let i = 1; i <= row.length; i++) {
                if (typeof row[i - 1] !== "string") break
                if (i > this.primaryColumnsNumber) this.primaryColumnsNumber = i
            }
        })
    }

    // Performs spanning, totalling, grouping. O(n)
    groupRows(rows: HTMLCollectionOf<HTMLTableRowElement>){

        let cellsToGroup:  HTMLTableCellElement[] = [],
            cellsToRemove: HTMLTableCellElement[] = [],
            matricesToSum: MatrixData[]           = []

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex],
                getRowData = (): RowData => this.modelWizard.properData[row.getAttribute("i")]

            for (let colIndex = this.primaryColumnsNumber - 1; colIndex >= 0; colIndex--) {
                const groupConfig = this.config.columnFeatures[colIndex].group
                if (groupConfig) {
                    const cell = row.cells[colIndex]
                    let thisIsGroupStart = cellsToGroup[colIndex] === undefined,
                        thisIsGroupEnd   = rowIndex === rows.length - 1

                        for (let i = 0; i <= colIndex; i++) {
                            if (!thisIsGroupStart && cellsToGroup[i].textContent !== row.cells[i].textContent)
                                thisIsGroupStart = true

                            if (!thisIsGroupEnd && rows[rowIndex + 1].cells[i].textContent !== row.cells[i].textContent)
                                thisIsGroupEnd = true
                        }

                    if (thisIsGroupStart){
                        cellsToGroup[colIndex] = cell
                        if (groupConfig.addTotal) {
                            matricesToSum[colIndex] = [getRowData()]
                        }
                    }
                    else if (thisIsGroupEnd) {
                        if(groupConfig.addTotal) {
                            setTimeout(() => {
                                // this.modelWizard.getDataTotal(matricesToSum[colIndex]).forEach((cellData, cellDataIndex) => {
                                //     if(cellDataIndex > this.primaryColumnsNumber)
                                //         totalRow.cells[cellDataIndex].textContent = String(cellData)
                                // })
                                row.insertAdjacentHTML("afterend",
                                    `<tr>${this.modelWizard.getDataTotal(matricesToSum[colIndex]).map(cellData => `<td class=${typeof cellData}>${cellData}</td>`)}</tr>`)
                            }, 500)
                        }
                    }
                    else {
                        if (groupConfig.span) {
                            cellsToGroup[colIndex].rowSpan++
                            cellsToRemove.push(cell)
                        }
                        if (groupConfig.addTotal) {
                            matricesToSum[colIndex].push(getRowData())
                        }
                    }
                }
            }
        }
        cellsToRemove.forEach(cell => cell.remove())
    }

}
import {ReportModelWizard} from "../../../../../model/ReportModelWizard";
import {tableTotalWord} from "../../../../../properties";

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

        if(!this.config.columnFeatures) return

        let cellsToGroup:  HTMLTableCellElement[] = []

        const commonProcess = (primaryCellCallback: (rowI: number,
                                               colI: number,
                                               thisIsGroupStart: boolean,
                                               thisIsGroupEnd: boolean,
                                               columnFeature: ColumnFeature) => void) => {

            for (let rowI = 0; rowI < rows.length; rowI++) {
                for (let colI = this.primaryColumnsNumber - 1; colI >= 0; colI--) {
                    const groupConfig = this.config.columnFeatures[colI].group
                    if (groupConfig) {
                        let thisIsGroupStart = cellsToGroup[colI] === undefined,
                            thisIsGroupEnd   = rowI               === rows.length - 1

                        for (let i = 0; i <= colI; i++) {
                            if (!thisIsGroupStart && cellsToGroup[i].textContent !== rows[rowI].cells[i].textContent)
                                thisIsGroupStart = true
                            if (!thisIsGroupEnd && rows[rowI + 1].cells[i].textContent !== rows[rowI].cells[i].textContent)
                                thisIsGroupEnd = true
                        }
                        if(thisIsGroupStart){
                            cellsToGroup[colI] = rows[rowI].cells[colI]
                        }
                        primaryCellCallback(rowI, colI, thisIsGroupStart, thisIsGroupEnd, this.config.columnFeatures[colI])
                    }
                }
            }
        },
            hasGroupFeature = (key: keyof ColumnFeature["group"]): boolean =>
                !!this.config.columnFeatures?.find(feature => feature.group && Object.keys(feature.group).includes(key))


        if (hasGroupFeature("addTotal")){
            let matricesToSum: MatrixData[] = [],
                totalRowsToInsertAfter = new Map<number, HTMLTableRowElement>() // Key is row i the total row will be inserted after

            commonProcess((rowI, colI, thisIsGroupStart, thisIsGroupEnd, columnFeature) => {

                if(!columnFeature.group.addTotal || !rows[rowI].hasAttribute("i"))
                    return

                const rowData = this.modelWizard.properData[rows[rowI].getAttribute("i")]
                if (thisIsGroupStart){
                    matricesToSum[colI] = [rowData]
                }
                else if (thisIsGroupEnd) {

                    matricesToSum[colI].push(rowData)
                    const totalRow = rows[rowI].cloneNode(true) as HTMLTableRowElement
                    this.modelWizard.getDataTotal(matricesToSum[colI]).forEach((cellData, cellDataIndex) => {
                        if (cellDataIndex >= colI)
                            totalRow.cells[cellDataIndex].classList.add("total")
                        if (cellDataIndex > colI)
                            totalRow.cells[cellDataIndex].textContent = cellDataIndex < this.primaryColumnsNumber ? tableTotalWord :  String(cellData)
                    })
                    totalRow.removeAttribute("i")
                    totalRowsToInsertAfter.set(rowI + totalRowsToInsertAfter.size, totalRow)
                }
                else {
                    matricesToSum[colI].push(rowData)
                }
            })
            Array.from(totalRowsToInsertAfter.entries())
                .forEach(([rowI, totalRow]) =>
                    rows[rowI].insertAdjacentElement("afterend", totalRow))
        }

        if (hasGroupFeature("span")){
            cellsToGroup = []
            let cellsToRemove: HTMLTableCellElement[] = []
            commonProcess((rowI, colI, thisIsGroupStart, thisIsGroupEnd, columnFeature) => {
                if(columnFeature.group.span && !thisIsGroupStart) {
                    cellsToGroup[colI].rowSpan++
                    cellsToRemove.push(rows[rowI].cells[colI])
                }
            })
            cellsToRemove.forEach(cell => cell.remove())
        }
    }
}
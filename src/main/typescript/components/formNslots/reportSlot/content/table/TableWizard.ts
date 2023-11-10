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

        if(!this.config.columnFeatures) return

        let cellsToGroup:  HTMLTableCellElement[] = [],
            cellsToRemove: HTMLTableCellElement[] = [],
            matricesToSum: MatrixData[]           = []

        const process = (primaryCellCallback: (rowI: number,
                                               colI: number,
                                               thisIsGroupStart: boolean,
                                               thisIsGroupEnd: boolean) => void) => {

            for (let rowI = 0; rowI < rows.length; rowI++) {
                for (let colI = this.primaryColumnsNumber - 1; colI >= 0; colI--) {
                    const groupConfig = this.config.columnFeatures[colI].group
                    if (groupConfig) {
                        let thisIsGroupStart = cellsToGroup[colI] === undefined,
                            thisIsGroupEnd = rowI === rows.length - 1

                        for (let i = 0; i <= colI; i++) {
                            if (!thisIsGroupStart && cellsToGroup[i].textContent !== rows[rowI].cells[i].textContent) {
                                cellsToGroup[colI] = rows[rowI].cells[colI]
                                thisIsGroupStart = true
                            }
                            if (!thisIsGroupEnd && rows[rowI + 1].cells[i].textContent !== rows[rowI].cells[i].textContent) {
                                thisIsGroupEnd = true
                            }
                        }
                        primaryCellCallback(rowI, colI, thisIsGroupStart, thisIsGroupEnd)
                    }
                }
            }
        },
            hasGroupFeatureKey = (key: keyof ColumnFeature["group"]): boolean => {
            console.log(this.config)

                return !!this.config.columnFeatures?.find(feature => feature[key])
            }

        if (hasGroupFeatureKey("addTotal")){
            let prevTotalColI: number,
                prevTotalRowI: number
            process((rowI, colI, thisIsGroupStart, thisIsGroupEnd) => {


                const rowData = this.modelWizard.properData[rows[rowI].getAttribute("i")]
                if(thisIsGroupStart){
                    matricesToSum[colI] = [rowData]
                }
                else if(thisIsGroupEnd){
                    console.log(this.modelWizard.getDataTotal(matricesToSum[colI]))
                    if(prevTotalColI === colI && prevTotalRowI === rowI)
                        return

                    matricesToSum[colI].push(rowData)
                    const totalRow = rows[rowI].cloneNode(true) as HTMLTableRowElement
                    this.modelWizard.getDataTotal(matricesToSum[colI]).forEach((cellData, cellDataIndex) => {
                        if (cellDataIndex >= colI)
                            totalRow.cells[cellDataIndex].classList.add("total")
                        if (cellDataIndex > colI)
                            totalRow.cells[cellDataIndex].textContent = String(cellData)
                    })
                    totalRow.removeAttribute("i");
                    (prevTotalRowI && prevTotalRowI === rowI ? rows[rows.length] : rows[rowI]).insertAdjacentElement("afterend", totalRow)
                    prevTotalColI = rowI
                    prevTotalRowI = rowI
                }
                else {
                    matricesToSum[colI].push(rowData)
                }
            })
        }

        if (hasGroupFeatureKey("span")){
            process((rowI, colI, thisIsGroupStart, thisIsGroupEnd) => {
                if(thisIsGroupStart){

                }
                else if(thisIsGroupEnd){

                }
                else {

                }
            })
        }

        // for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        //     const row = rows[rowIndex],
        //         getRowData = (): RowData => this.modelWizard.properData[row.getAttribute("i")]
        //     let prevTotalRow: HTMLTableRowElement
        //     for (let colIndex = this.primaryColumnsNumber - 1; colIndex >= 0; colIndex--) {
        //         const groupConfig = this.config.columnFeatures[colIndex].group
        //
        //         if (groupConfig) {
        //             let thisIsGroupStart = cellsToGroup[colIndex] === undefined,
        //                 thisIsGroupEnd   = rowIndex === rows.length - 1
        //
        //                 for (let i = 0; i <= colIndex; i++) {
        //                     if (!thisIsGroupStart && cellsToGroup[i].textContent !== row.cells[i].textContent)
        //                         thisIsGroupStart = true
        //
        //                     if (!thisIsGroupEnd && rows[rowIndex + 1].cells[i].textContent !== row.cells[i].textContent)
        //                         thisIsGroupEnd = true
        //                 }
        //
        //             if (thisIsGroupStart){
        //                 cellsToGroup[colIndex] = row.cells[colIndex]
        //                 if (groupConfig.addTotal) {
        //                     matricesToSum[colIndex] = [getRowData()]
        //                 }
        //             }
        //             else if (thisIsGroupEnd) {
        //                 if(groupConfig.addTotal) {
        //                     matricesToSum[colIndex].push(getRowData())
        //                     const totalRow = row.cloneNode(true) as HTMLTableRowElement
        //                     this.modelWizard.getDataTotal(matricesToSum[colIndex]).forEach((cellData, cellDataIndex) => {
        //                         if (cellDataIndex >= colIndex)
        //                             totalRow.cells[cellDataIndex].classList.add("total")
        //                         if (cellDataIndex > colIndex)
        //                             totalRow.cells[cellDataIndex].textContent = String(cellData)
        //                     })
        //                     totalRow.removeAttribute("i");
        //                     (prevTotalRow ? prevTotalRow : row).insertAdjacentElement("afterend", totalRow)
        //                     prevTotalRow = totalRow
        //                     rowIndex++
        //
        //                     if (groupConfig.span) {
        //                         cellsToGroup[colIndex].rowSpan++
        //                         cellsToRemove.push(row.cells[colIndex])
        //                         cellsToGroup[colIndex].rowSpan++
        //                         cellsToRemove.push(totalRow.cells[colIndex])
        //                     }
        //                 }
        //             }
        //             else {
        //                 if (groupConfig.span) {
        //                     cellsToGroup[colIndex].rowSpan++
        //                     cellsToRemove.push(row.cells[colIndex])
        //                 }
        //                 if (groupConfig.addTotal) {
        //                     matricesToSum[colIndex].push(getRowData())
        //                 }
        //             }
        //         }
        //     }
        // }
        cellsToRemove.forEach(cell => cell.remove())
    }

    private primaryPostprocess(){

    }
}
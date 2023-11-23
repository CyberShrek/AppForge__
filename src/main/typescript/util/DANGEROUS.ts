export function executeFormulaForRowData(formula: string,
                                         i: number,
                                         row: RowData,
                                         totalRow: RowData){

    // These fictitious calls need to prevent arguments removing by compiler optimisation.
    // They all can be used in the formula
    row.length
    totalRow.length

    const fun = new Function("i", "row", "totalRow", `return ${formula}`)

    return fun(i, row, totalRow)
}
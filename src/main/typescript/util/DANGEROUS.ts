export function executeFormulaForRowData(formula: string,
                                         row: RowData,
                                         totalRow: RowData,
                                         matrix: MatrixData){

    // These fictitious calls need to prevent arguments removing by compiler optimisation.
    // They all can be used in the formula
    row.length
    totalRow.length
    matrix.length

    return eval(formula)
}
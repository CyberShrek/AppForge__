interface ReportModel {
    slot?: string
    data: MatrixData
    comparisonData?: MatrixData
    config?: ReportSlotConfig

    // Apply after fetching the report from server
    usedValues?: FormValues
    usedOptions?: FieldOptions
    // Used only by chained reports (called from another report)
    usedData?: MatrixData
}
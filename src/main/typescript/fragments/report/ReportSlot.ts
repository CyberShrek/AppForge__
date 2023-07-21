import {Fragment} from "../abstract/Fragment"

export default class ReportSlot extends Fragment{
    constructor(public location: FragmentLocation) {
        super(location)
    }
}

class Report {
    totalRow
    rows = []
    isEmpty
    // (fetchedReport) is a table with header — basic array of column names, and body — rows whose are basic arrays too.
    // (ReportRowClass) is a class used for totalRow and rows.
    // (getTotalCell) is a function used for finding the total row via cell "TOTAL"
    constructor(fetchedReport, getTotalCell) {
        // Iterating through the all rows
        for(const row of fetchedReportToRows(fetchedReport)){
            if(!this.totalRow && getTotalCell(row).trim() === "TOTAL")
                this.totalRow = row
            else
                this.rows.push(row)
        }
        this.isEmpty= this.rows.length === 0
    }
}

class ReportRow{
    constructor(rowArray, columnNamedIndexes) {
        for (const namedIndex in columnNamedIndexes) {
            this[namedIndex] = rowArray[columnNamedIndexes[namedIndex]]
        }
    }
}

function fetchedReportToRows(reportTable){
    const columnNamedIndexes = getColumnNamedIndexesOfHeader(reportTable.header)
    return reportTable.body
        .map(rowArray => new ReportRow(rowArray, columnNamedIndexes))
}

// Takes a header row array, find indexes by its values and returns an object having all these indexes as js fields
function getColumnNamedIndexesOfHeader(header){
    const indexes = {}
    for (let i = 0; i < header.length; i++) {
        indexes[header[i]] = i
    }
    return indexes
}
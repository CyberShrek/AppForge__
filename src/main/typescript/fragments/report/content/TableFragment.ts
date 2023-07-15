import {Fragment} from "../../Fragment"
import {FragmentLocation} from "../../../entities/Fragment"
import {emptyElement, createElement} from "../../../utils/domWizard"

export class TableFragment extends Fragment{

    private thead: HTMLTableSectionElement = createElement("thead")
    private tbody: HTMLTableSectionElement = createElement("tbody")

    constructor(location: FragmentLocation) {
        super(createElement("table"), location)
        this.core.append(this.thead, this.tbody)
    }

    setHeader(){

    }

    setBody(body: TableBodyMap){
        emptyElement(this.tbody)
        body.forEach((valueCells, primaryCells) =>
            this.appendRow(primaryCells, valueCells)
        )
    }

    appendRow(primaryCells: PrimaryCell[], valueCells: ValueCell[]){
        const tr: HTMLTableRowElement = createElement("tr")
        tr.append(...[
            ...primaryCells,
            ...valueCells]
            .map(cell => this.createHTMLCell(String(cell)))
        )
        this.tbody.append(tr)
    }

    private createHTMLCell(cellContent: string): HTMLTableCellElement{
        const cell: HTMLTableCellElement = createElement("td")
        cell.textContent = cellContent
        return cell
    }

    setTotal(){

    }
}
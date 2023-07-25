import {ExistedFragment} from "../abstract/ExistedFragment"
import {createDivElement, emptyElement} from "../../utils/DOMWizard";
import {Table} from "./content/Table";
import {Chart} from "./content/Chart";

export class Body extends ExistedFragment{

    private _collapsed: boolean = false
    private tableModelCache: TableModel
    private chartsModelCache: ChartModel[]

    constructor(core: HTMLDivElement) {
        super(core)
    }

    showLoading(){
        this.core.appendChild(createDivElement({class: "loading"}))
    }

    applyTable(model: TableModel): Table{
        this.tableModelCache = model
        return new Table({target: this.core, position: "beforeend"}, model)
    }

    applyCharts(models: ChartModel[]): Chart[]{
        this.chartsModelCache = models
        const chartsWrapper = createDivElement({class: "charts"})
        this.core.appendChild(chartsWrapper)
        return models.map(model => new Chart({target: chartsWrapper, position: "afterbegin"}, model))
    }

    get collapsed(): typeof this._collapsed{
        return this._collapsed
    }

    set collapsed(collapsed: typeof this._collapsed){
        this._collapsed = collapsed
        if(this.collapsed) emptyElement(this.core)
        else {
            if(this.tableModelCache) this.applyTable(this.tableModelCache)
            if(this.chartsModelCache) this.applyCharts(this.chartsModelCache)
        }
    }

    toggleCollapse=() => this.collapsed = !this.collapsed


    reset(){
        this.tableModelCache = undefined
        this.chartsModelCache = undefined
        emptyElement(this.core)
    }
}
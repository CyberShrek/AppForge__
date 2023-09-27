import {AbstractServiceBank} from "./AbstractServiceBank"

export class StationsServiceBank extends AbstractServiceBank
{
    protected mainConditions = [this.dataCondition]

    protected errorMessageEnding: string = "станций"
    protected requestStep = {
        listName: "stanList",
        specificBodiesFn: () => this.properties.roads.map(code => {
            return {"dor": this.properties.roads}
        })
    }
    protected responseStep = {
        parseItemToOptionFn: item => [item["stan"], item["pnazv"]] as Option,
        errorMessageEnding: "станций"
    }
    protected userCheckPermission

    userAssociatedOptionKeys = []
}
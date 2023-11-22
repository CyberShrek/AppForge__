import {AbstractServiceBank} from "./AbstractServiceBank"
import {userInfo} from "../../../store/userInfo";

export class StationsServiceBank extends AbstractServiceBank
{
    protected mainConditions = [this.dataCondition, () => this.properties.roads?.length > 0]

    protected errorMessageEnding: string = "станций"
    protected requestStep = {
        listName: "stanList",
        specificBodyFn: () =>  {
            return {"dor": this.properties.roads.join(",")}
        }
    }
    protected responseStep = {
        parseItemToOptionFn: item => [item["stan"], item["pnazv"]],
        errorMessageEnding: "станций"
    }
    protected userCheckPermission

    userAssociatedOptionKeys = []
}
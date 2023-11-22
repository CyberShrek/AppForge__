import {AbstractServiceBank} from "./AbstractServiceBank"
import {userInfo} from "../../../store/userInfo"

export class RoadsServiceBank extends AbstractServiceBank
{
    protected mainConditions = [this.dataCondition, () => this.properties.countries?.length > 0]

    protected requestStep = {
        listName: "dorList",
        specificBodyFn: () => {
            return {"gos": this.properties.countries}
        }
    }

    protected responseStep = {
        parseItemToOptionFn: item => [`${item["d_kod"]}`, item["d_name"]],
        errorMessageEnding: "дорог"
    }

    protected userCheckPermission = {
        propertyName: "dor",
        propertyValue: userInfo.road
    }

    userAssociatedOptionKeys = [userInfo.road]
}
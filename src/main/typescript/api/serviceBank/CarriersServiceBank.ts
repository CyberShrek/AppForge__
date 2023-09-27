import {AbstractServiceBank} from "./AbstractServiceBank"
import {userInfo} from "../../store/userInfo";

export class CarriersServiceBank extends AbstractServiceBank
{
    protected mainConditions = [this.dataCondition]

    protected requestStep = {
        listName: "perList"
    }
    protected responseStep = {
        parseItemToOptionFn: item => [`${item["gos"]}.${item["skp"]}`, item["nazvp"]] as Option,
        errorMessageEnding: "перевозчиков"
    }
    protected userCheckPermission = {
        propertyName: "skp",
        propertyValue: userInfo.carrier
    }

    userAssociatedOptionKeys = [`${userInfo.country}.${userInfo.carrier}`]
}
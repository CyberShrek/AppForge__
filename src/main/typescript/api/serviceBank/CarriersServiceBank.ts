import {AbstractServiceBank} from "./AbstractServiceBank"
import {userInfo} from "../../store/userInfo";

export class CarriersServiceBank extends AbstractServiceBank
{
    protected mainConditions = [this.dataCondition]

    protected requestStep = {
        listName: "perList",
        specificBodiesFn: () => this.properties.countries.map(code => {
            return {"gos": code}
        })
    }
    protected responseStep = {
        parseItemToOptionFn: item => [`${this.properties.countries?.length >= 2 ? item["gos"] + '.' : ''}${item["skp"]}`, item["nazvp"]] as Option,
        errorMessageEnding: "перевозчиков"
    }
    protected userCheckPermission = {
        propertyName: "skp",
        propertyValue: userInfo.carrier
    }

    userAssociatedOptionKeys = [`${userInfo.carrier}`]
}
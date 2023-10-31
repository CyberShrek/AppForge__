import {AbstractServiceBank} from "./AbstractServiceBank"
import {userInfo} from "../../store/userInfo";

export class CountriesServiceBank extends AbstractServiceBank
{
    protected mainConditions = [this.dataCondition]

    protected requestStep = {
        listName: "gosList"
    }
    protected responseStep = {
        parseItemToOptionFn: (item => [item["g_kod"], item["g_name"]]),
        filterFn: ((item) => !!this.properties?.postSoviet ? item["g_prsng"] == "1" : true),
        errorMessageEnding: "государств"
    }
    protected userCheckPermission = {
        propertyName: "gos",
        propertyValue: userInfo.country
    }

    userAssociatedOptionKeys = []
}
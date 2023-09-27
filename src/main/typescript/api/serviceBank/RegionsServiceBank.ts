import {AbstractServiceBank} from "./AbstractServiceBank"

export class RegionsServiceBank extends AbstractServiceBank
{
    protected mainConditions = [this.dataCondition]

    protected requestStep = {
        listName: "sfList"
    }
    protected responseStep = {
        parseItemToOptionFn: item => [item["sf_kod2"], item["sf_name"]] as Option,
        errorMessageEnding: "субъектов"
    }
    protected userCheckPermission

    userAssociatedOptionKeys = []
}
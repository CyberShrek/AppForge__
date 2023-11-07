import {userInfo} from "../../../store/userInfo";
import {EndpointOptionsAccessor} from "../EndpointOptionsAccessor"
import {JsonAccessor} from "../../abstract/JsonAccessor";

export abstract class AbstractServiceBank extends JsonAccessor{

    abstract userAssociatedOptionKeys: OptionKey[]

    override path = `${document.location.origin}/servicebank/getdata`

    constructor() {
        super()
        this.method = "POST"
        this.errorFooter = "Не удалось загрузить список опций из банка микросервисов"
    }

    protected properties: ServiceBankSetup["properties"]

    protected dataCondition = () => this.properties?.date?.length > 0

    protected abstract mainConditions: (() => boolean)[]

    protected abstract requestStep: {
        listName: string
        specificBodiesFn?: () => {}[]
    }

    protected abstract userCheckPermission?: {
        propertyName: string
        propertyValue: string | number | boolean
    }

    protected abstract responseStep: {
        parseItemToOptionFn: (items: any) => string[]
        filterFn?: (item: any) => boolean
        errorMessageEnding: string
    }

    override fetch(properties?: ServiceBankSetup["properties"]): Promise<OptionsMap> {
        this.properties  = properties
        if(this.mainConditions.find(conditionCallback => conditionCallback() === false))
            return new Promise(resolve => resolve(new Map()))
        else {
            const fetchCallback=() => {
                this.setServiceBankBody(this.requestStep.listName, this.requestStep.specificBodiesFn?.())
                return this.fetchServiceBankOptions(this.responseStep.parseItemToOptionFn, this.responseStep.filterFn)
            }
            if(!userInfo.superUser && this.userCheckPermission){
                this.properties[this.userCheckPermission.propertyName] = this.userCheckPermission.propertyValue
            }
            return fetchCallback()
        }
    }

    private setServiceBankBody(listName: string, specificBodies: any[] = [{}]): void{
        // Properties with unknown name will remain as custom properties
        const custom = {...this.properties}
        custom.date = custom.roads = custom.countries = custom.postSoviet = custom.carriers = undefined
        this.body = {
            [listName]: [...specificBodies.map(body => { return {
                "data": Array.isArray(this.properties.date) ? this.properties.date[0] : this.properties.date,
                ...body,
                ...custom
            }})]
        }
    }

    private fetchServiceBankOptions(parseItemToOptionFn: (items: any) => string[],
                                    filter?: (item: any) => boolean): Promise<OptionsMap> {

        return super.fetch().then(json =>
            // The only first item is approved
            new Map((json[Object.keys(json as any)[0]] as Array<any>)
                .filter((item) => filter ? filter(item) : true)
                    .map((item) => {
                        const parsed = parseItemToOptionFn(item)
                        parsed[1] = parsed[1].trim()
                        return parsed as [string, string]
                    })
            )
        )
    }
}
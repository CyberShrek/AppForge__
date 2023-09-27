import {JsonAccessor} from "../abstract/JsonAccessor"
import {userInfo} from "../../store/userInfo";

export abstract class AbstractServiceBank extends JsonAccessor{

    override path = `${document.location.origin}/servicebank/getdata`

    abstract userAssociatedOptionKeys: OptionKey[]

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
        parseItemToOptionFn: (items: any) => Option
        filterFn?: (item: any) => boolean
        errorMessageEnding: string
    }

    constructor(protected permitAll: boolean) {
        super()
        this.method = "POST"
    }

    override fetch(properties?: ServiceBankSetup["properties"]): Promise<Options> {
        this.properties = properties
        this.errorFooter = "Не удалось загрузить список " + this.responseStep.errorMessageEnding
        if(this.mainConditions.find(conditionCallback => conditionCallback() === false))
            return new Promise(resolve => resolve(new Map()))
        else {
            const fetchCallback=() => {
                this.setServiceBankBody(this.requestStep.listName, this.requestStep.specificBodiesFn?.())
                return this.fetchServiceBankOptions(this.responseStep.parseItemToOptionFn, this.responseStep.filterFn)
            }
            if(!this.permitAll && !userInfo.isAdmin && this.userCheckPermission){
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
                "data": this.properties.date[0],
                ...body,
                ...custom
            }})]
        }
    }

    private fetchServiceBankOptions(parseItemToOptionFn: (items: any) => Option,
                                    filter?: (item: any) => boolean): Promise<Options> {

        return super.fetch().then(json =>
            // The only first item is approved
            new Map((json[Object.keys(json as any)[0]] as Array<any>)
                .filter((item) => filter ? filter(item) : true)
                .map((item) => {
                    const parsed = parseItemToOptionFn(item)
                    parsed[1] = parsed[1].trim()
                    return parsed
                })
            )
        )
    }
}

function roadCodesToBodies(codes: string[]): {"gos": string, "dor": string}[]{
    const bodies = []
    codes.forEach(fullRoadCode => {
        const splittedRoadCode = fullRoadCode.split("."),
            countryCode = splittedRoadCode[0],
            roadCode = splittedRoadCode[1],
            lastBody = bodies.length > 0 ? bodies[bodies.length - 1] : null

        if(lastBody){
            if(lastBody.gos !== countryCode)
                bodies.push({"gos": countryCode, "dor": roadCode})
            else
                lastBody.dor += `,${roadCode}`
        }

    })
    return bodies
}
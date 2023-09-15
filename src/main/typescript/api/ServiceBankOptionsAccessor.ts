import {JsonAccessor} from "./abstract/JsonAccessor"

export class ServiceBankOptionsAccessor extends JsonAccessor{

    override path = `${document.location.origin}/servicebank/getdata`
    private properties: ServiceBankSetup["properties"]

    constructor(private type: ServiceBankSetup["type"]) {
        super()
        this.method = "POST"
        this.errorFooter = `Не удалось загрузить список ${
            type === "carriers" ? "перевозчиков" :
                type === "countries" ? "государств" :
                    type === "regions" ? "субъектов" :
                        type === "roads" ? "дорог" :
                            type === "stations" ? "станций" : "опций"}`
    }

    override fetch(properties?: ServiceBankSetup["properties"]): Promise<Options> {
        this.properties = properties
        return this.type === "carriers" ? this.fetchCarriers() :
            this.type === "countries" ? this.fetchCountries() :
                this.type === "regions" ? this.fetchRegions() :
                    this.type === "roads" ? this.fetchRoads() :
                        this.type === "stations" ? this.fetchStations()
                            : promiseEmptyOptions()
    }

    private fetchCarriers(): Promise<Options>{
        if(this.properties?.date?.length > 0) {
            this.setServiceBankBody("perList")
            return this.fetchServiceBankOptions(
                item => [`${item["gos"]}.${item["skp"]}`, item["nazvp"]]
            )
        }
        return promiseEmptyOptions()
    }

    private fetchCountries(): Promise<Options>{
        if(this.properties?.date?.length > 0) {
            this.setServiceBankBody("gosList")
            return this.fetchServiceBankOptions(
                item => [item["g_kod"], item["g_name"]],
                item => !!this.properties?.postSoviet ? item["g_prsng"] == "1" : true
            )
        }
        return promiseEmptyOptions()
    }


    private fetchRegions(): Promise<Options>{
        if(this.properties?.date?.length > 0) {
            this.setServiceBankBody("sfList")
            return this.fetchServiceBankOptions(
                item => [item["sf_kod2"], item["sf_name"]]
            )
        }
        return promiseEmptyOptions()
    }

    private fetchRoads(): Promise<Options>{
        if(this.properties?.date?.length > 0 && this.properties.countries?.length > 0) {
            this.setServiceBankBody("dorList", this.properties.countries.map(code => {
                return {"gos": code}
            }))
            return this.fetchServiceBankOptions(
                item => [`${item["d_kod"]}`, item["d_name"]]
            )
        }
        return promiseEmptyOptions()
    }

    private fetchStations(): Promise<Options>{
        if(this.properties?.date?.length > 0 && this.properties.roads?.length > 0) {
            this.setServiceBankBody("stanList", this.properties.roads.map(code => {
                return {"dor": this.properties.roads}
            }))
            return this.fetchServiceBankOptions(
                item => [item["stan"], item["pnazv"]]
            )
        }
        return promiseEmptyOptions()
    }

    private setServiceBankBody(listName: string, specificBodies: any[] = [{}]): void{
        // Properties with unknown name will remain as custom properties
        const custom = {...this.properties}
        custom.date = custom.roads = custom.countries = custom.postSoviet = custom.carriers = undefined
        this.body = {
            [listName]: [...specificBodies.map(body => {return{
                "data": this.properties.date[0],
                ...body,
                ...custom
            }})]
        }
    }

    private fetchServiceBankOptions(parseItemToOptionFn: (items: any) => [OptionKey, OptionLabel],
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

function promiseEmptyOptions(): Promise<Options>{
    return new Promise(resolve => resolve(new Map()))
}
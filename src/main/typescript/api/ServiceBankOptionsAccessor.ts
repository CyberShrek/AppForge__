import {Accessor} from "./abstract/Accessor"
import {JsonAccessor} from "./abstract/JsonAccessor";

export class ServiceBankOptionsAccessor extends JsonAccessor<Options>{

    override path = `${document.location.origin}/servicebank/getdata`
    private properties: ServiceBankConfig["properties"]

    constructor(private type: ServiceBankConfig["type"]) {
        super()
        this.method = "POST"
        this.errorMessage = `Не удалось загрузить список ${
            type === "carriers" ? "перевозчиков" :
                type === "countries" ? "государств" :
                    type === "roads" ? "дорог" :
                        type === "stations" ? "станций" : "опций"}`
    }

    override fetch(properties?: ServiceBankConfig["properties"]): Promise<Options> {
        this.properties = properties
        return this.type === "carriers" ? this.fetchCarriers() :
            this.type === "countries" ? this.fetchCountries() :
                this.type === "roads" ? this.fetchRoads() :
                    this.type === "stations" ? this.fetchStations() : null
    }

    private fetchCarriers(): Promise<Options>{
        this.setServiceBankBody("perList")
        return this.fetchServiceBankOptions(
            item => [`${item["gos"]}.${item["skp"]}`, item["nazvp"]]
        )
    }

    private fetchCountries(): Promise<Options>{
        this.setServiceBankBody("gosList")
        return this.fetchServiceBankOptions(
            item => [item["g_kod"], item["g_name"]],
            item => !!this.properties?.postSoviet ? item["g_prsng"] == "1" : true
        )
    }

    private fetchRoads(): Promise<Options>{
        this.setServiceBankBody("dorList", ...this.properties?.countries?.map(code => {return {"gos": code}}))
        return this.fetchServiceBankOptions(
            item => [`${item["g_kod"]}.${item["d_kod"]}`, item["d_name"]]
        )
    }

    private fetchStations(): Promise<Options>{
        this.setServiceBankBody("stanList", ...roadCodesToBodies(this.properties.roads))
        return this.fetchServiceBankOptions(
            item => [item["stan"], item["pnazv"]]
        )
    }

    private setServiceBankBody(listName: string, ...customBodies: any[]): void{
        this.body = {
            [listName]: [...customBodies.map(body => {return{
                "data": this.properties.date,
                ...body,
                // Properties with unknown name will remain as custom properties
                ...{ ...this.properties } as Omit<typeof this.properties, keyof (typeof this.properties)>
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
    this.properties?.roads?.forEach(fullRoadCode => {
        const splittedRoadCode = fullRoadCode.split("."),
            countryCode = splittedRoadCode[0],
            roadCode = splittedRoadCode[1],
            lastBody = bodies.length > 0 ? bodies[bodies.length - 1] : null

        if(lastBody && lastBody.gos !== countryCode)
            bodies.push({"gos": countryCode, "dor": roadCode})
        else
            lastBody.dor += `,${roadCode}`
    })
    return bodies
}
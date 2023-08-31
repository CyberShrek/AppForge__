import {Accessor} from "./Accessor"
import {json} from "stream/consumers";

export class ServiceBankOptionsAccessor extends Accessor<Options>{

    override path = `${document.location.origin}/servicebank/getdata`

    constructor(
        private type: ServiceBankConfig["type"],
        private properties: ServiceBankConfig["properties"]
    ) {
        super()
        this.method = "POST"
        this.errorMessage = `Не удалось загрузить список ${
            type === "carriers" ? "перевозчиков" :
                type === "countries" ? "государств" :
                    type === "roads" ? "дорог" :
                        type === "stations" ? "станций" 
                            : "опций"}`
    }

    override fetch() {

        return super.fetch<any>().then(json => {

        })
    }
}
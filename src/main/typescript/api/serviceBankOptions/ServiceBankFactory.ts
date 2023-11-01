import {CarriersServiceBank} from "./CarriersServiceBank"
import {AbstractServiceBank} from "./AbstractServiceBank"
import {CountriesServiceBank} from "./CountriesServiceBank"
import {RegionsServiceBank} from "./RegionsServiceBank"
import {RoadsServiceBank} from "./RoadsServiceBank"
import {StationsServiceBank} from "./StationsServiceBank"

export const ServiceBankFactory = {
    createOptionsAccessor: (type: ServiceBankType): AbstractServiceBank => {
        switch (type){
            case "carriers":  return new CarriersServiceBank()
            case "countries": return new CountriesServiceBank()
            case "regions":   return new RegionsServiceBank()
            case "roads":     return new RoadsServiceBank()
            case "stations":  return new StationsServiceBank()
        }
    }
}
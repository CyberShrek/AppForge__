// This code exports four functions that can be used to fetch carriers, countries, roads, and stations from a service bank API.
// The code also defines several interfaces for different types of objects.
import wretch from "wretch"
import {popupError, popupHttpDataError} from "../modal";
import {pairOf} from "../misc";
const serviceBankURL = `${document.location.origin}/servicebank/getdata`

export const fetchCarriersByDate = (date: Date|string): Promise<Option[]> =>
    fetchOptions("perList", date, (item) => ({
        label: item["nazvp"],
        // Each value consists of countryValue.carrierValue
        value: `${item["gos"]}.${item["skp"]}`
    }), null,
        "Не удалось загрузить список перевозчиков")

export const fetchCountriesByDate = (date: Date|string, postUssrOnly: boolean): Promise<Option[]> =>
    fetchOptions("gosList", date, (item) => ({
        label: item["g_name"],
        value: item["g_kod"]
    }), null,
        "Не удалось загрузить список стран")

export const fetchRoadsByCountriesAndDate = async (countryValues: Option["value"][],
                                                   date: Date|string): Promise<Option[]> =>
    (await Promise.all(
        countryValues.map( (countryValue) =>
            fetchOptions("dorList", date, item => ({
                label: item["d_name"],
                // Each value consists of countryValue.roadValue
                value: `${countryValue}.${item["d_kod"]}`
            }), {
                "gos": countryValue
            },
                "Не удалось загрузить список дорог")
        ))).flat()

export const fetchStationsByRoadsAndDate = async (roadValues: Option["value"][],
                                                  date: Date|string,
                                                  extraProperty?: Pair<string, string>): Promise<Option[]> =>
    (await Promise.all(
        Array.from(mapRoadsByCountryCodeAndRoadCodes(roadValues)).map(([countryValue, roadValues]) =>
            fetchOptions("stanList", date, (item) => ({
                label: item["pnazv"],
                value: item["stan"]
            }), {
                "gos": countryValue,
                "dor": roadValues.join(","),
                // [extraProperty.first]: extraProperty.second,
                    // [transferType === TransferType.BAGGAGE ? "pr_bo" : "prpop"]: "1"
                "pr_bo" :"1"
            },
                "Не удалось загрузить список станций")
        )
    )).flat()


const fetchOptions = (listName: string,
                      date: Date|string,
                      parseItemFn: (item: any) => Option,
                      extraProperties = {},
                      errorFooter?: string): Promise<Option[]> =>
    wretch(serviceBankURL)
        .post({
            [listName]: [{"data": date, ...extraProperties}]
        })
        .json(json => {
            const firstChildKey = Object.keys(json)[0]
            return (json[firstChildKey] as Array<any>).map((item) => {
                const option = parseItemFn(item)
                option.description = option.value
                option.alias = option.value
                return option
            })
        })
        .catch(error => {
            popupHttpDataError(error, errorFooter)
            throw error
        })


const mapRoadsByCountryCodeAndRoadCodes = (roads: Option["value"][]) => {
    const codesMap = new Map<Option["value"], string[]>()
    for (const road of roads) {
        const roadValueEntries = road.split("."),
            countryValue = roadValueEntries[0],
            roadValue = roadValueEntries[1]

        if (!codesMap.has(countryValue)) {
            codesMap.set(countryValue, [])
        }
        codesMap.get(countryValue)?.push(roadValue)
    }
    return codesMap}
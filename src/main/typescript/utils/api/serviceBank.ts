// This code exports four functions that can be used to fetch carriers, countries, roads, and stations from a service bank API.
// The code also defines several interfaces for different types of objects.
import wretch from "wretch"
import {popupHttpDataError} from "../modal";
import {setCursorToDefault, setCursorToLoading} from "../misc";
const serviceBankURL = `${document.location.origin}/servicebank/getdata`

export const fetchCarriersByDate = (date: Date|string): Promise<Map<OptionKey, OptionLabel>> =>
    fetchOptions("perList", date,
        (item) => [
        item["nazvp"],
        // Each value consists of countryValue.carrierValue
        `${item["gos"]}.${item["skp"]}`
        ],
        null,null,
        "Не удалось загрузить список перевозчиков")

export const fetchCountriesByDate = (date: Date|string, postSovietOnly: boolean): Promise<Map<OptionKey, OptionLabel>> =>
    fetchOptions("gosList", date,
        (item) => [item["g_name"], item["g_kod"]],
        {"g_prsng": "1"},
        (item) => postSovietOnly ? item["g_prsng"] == "1" : true,
        "Не удалось загрузить список государств")

export const fetchRoadsByCountriesAndDate = async (countryValues: string[],
                                                   date: Date|string): Promise<Map<OptionKey, OptionLabel>> =>
    mergePromises(countryValues.map((countryValue) =>
        fetchOptions("dorList", date,
            item => [
                item["d_name"],
                // Each value consists of countryValue.roadValue
                `${countryValue}.${item["d_kod"]}`
            ],
            {
                "gos": countryValue
            }, null,
            "Не удалось загрузить список дорог"
        )
    ))


export const fetchStationsByRoadsAndDate = async (roadValues: string[],
                                                  date: Date|string,
                                                  extraProperty?: Pair<string, string>): Promise<Map<OptionKey, OptionLabel>> =>
    mergePromises(
        Array.from(mapRoadsByCountryCodeAndRoadCodes(roadValues)).map(([countryValue, roadValues]) =>
            fetchOptions("stanList", date,
                (item) => [item["pnazv"], item["stan"]],
                {
                    "gos": countryValue,
                    "dor": roadValues.join(","),
                    // [extraProperty.first]: extraProperty.second,
                        // [transferType === TransferType.BAGGAGE ? "pr_bo" : "prpop"]: "1"
                    "pr_bo" :"1"
                },null,
                "Не удалось загрузить список станций")
        )
    )


const fetchOptions = (listName: string,
                      date: Date|string,
                      parseItemFn: (item: any) => [OptionKey
                          , OptionLabel],
                      extraProperties = {},
                      filter?: (item: any) => boolean,
                      errorFooter?: string): Promise<Map<OptionKey, OptionLabel>> => {
    setCursorToLoading()
    return wretch(serviceBankURL)
        .post({
            [listName]: [{"data": date, ...extraProperties}]
        })
        .json(json => {
            const firstChildKey = Object.keys(json)[0]
            return new Map((json[firstChildKey] as Array<any>)
                .filter((item) => filter ? filter(item) : true)
                .map((item) => parseItemFn(item)))
        })
        .catch(error => {
            popupHttpDataError(error, errorFooter)
            return new Map()
        })
        .finally(() => setCursorToDefault())
}

function mergePromises(promises: Promise<Map<OptionKey, OptionLabel>>[]): Promise<Map<OptionKey, OptionLabel>> {
    return Promise.all(promises)
        .then((results) => {
            const mergedResult = new Map<OptionKey, OptionLabel>();
            results.forEach((result) => {
                result.forEach((value, key) => {
                    mergedResult.set(key, value);
                });
            });
            return mergedResult;
        })
        .catch((error) => {
            // Обработка ошибок
        }) as Promise<Map<OptionKey, OptionLabel>>
}


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
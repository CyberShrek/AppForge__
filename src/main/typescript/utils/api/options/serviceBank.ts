// This code exports four functions that can be used to fetch carriers, countries, roads, and stations from a service bank API.
// The code also defines several interfaces for different types of objects.
import wretch from "wretch"
import {popupHttpDataError} from "../../modal";
import {setCursorToDefault, setCursorToLoading} from "../../misc";
const serviceBankURL = `${document.location.origin}/servicebank/getdata`

export const fetchCarriersByDate = (date: DateRange): Promise<Map<OptionKey, OptionLabel>> =>
    fetchOptions("perList", date,
        (item) => [
        item["nazvp"],
        // Each value consists of countryValue.carrierValue
        `${item["gos"]}.${item["skp"]}`
        ],
        null,null,
        "Не удалось загрузить список перевозчиков")

export const fetchCountriesByDate = (date: DateRange, postSovietOnly: boolean): Promise<Options> =>
    fetchOptions("gosList", date,
        (item) => [item["g_name"], item["g_kod"]],
        {"g_prsng": "1"},
        (item) => postSovietOnly ? item["g_prsng"] == "1" : true,
        "Не удалось загрузить список государств")

export const fetchRoadsByDateAndCountries = async (date: DateRange,
                                                   countryValues: string[]): Promise<Options> =>
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


export const fetchStationsByDateAndRoads = async (date: DateRange,
                                                  roadValues: string[],
                                                  extraProperty?: Pair<string, string>): Promise<Options> =>
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
                      date: DateRange,
                      parseItemFn: (item: any) => [OptionKey
                          , OptionLabel],
                      extraProperties = {},
                      filter?: (item: any) => boolean,
                      errorFooter?: string): Promise<Options> => {
    setCursorToLoading()
    return wretch(serviceBankURL)
        .post({
            [listName]: [{"data": date[0], ...extraProperties}]
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

function mergePromises(promises: Promise<Map<OptionKey, OptionLabel>>[]): Promise<Options> {
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
        }) as Promise<Options>
}


const mapRoadsByCountryCodeAndRoadCodes = (roads: OptionKey[]) => {
    const codesMap = new Map<OptionKey, string[]>()
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
// This code exports four functions that can be used to fetch carriers, countries, roads, and stations from a service bank API.
// The code also defines several interfaces for different types of objects.
import wretch from "wretch"
import {popupHttpDataError} from "../../modal";
import {setCursorToDefault, setCursorToLoading} from "../../domWizard";
const serviceBankURL = `${document.location.origin}/servicebank/getdata`

export const fetchCarriersByDate = (date: DateRange): Promise<Map<OptionKey, OptionLabel>> =>
    fetchOptions("perList", date,
        (item) => [
        // Each key consists of countryKey.carrierKey
        `${item["gos"]}.${item["skp"]}`,
        item["nazvp"]
        ],
        null,null,
        "Не удалось загрузить список перевозчиков")

export const fetchCountriesByDate = (date: DateRange, postSovietOnly: boolean): Promise<Options> =>
    fetchOptions("gosList", date,
        (item) => [item["g_kod"], item["g_name"]],
        {"g_prsng": "1"},
        (item) => postSovietOnly ? item["g_prsng"] == "1" : true,
        "Не удалось загрузить список государств")

export const fetchRoadsByDateAndCountries = async (date: DateRange, countries: Options): Promise<Options> => {
    const fetchRoads=(countryKey: OptionKey) =>
        fetchOptions("dorList", date,
            item => [
                // Each key consists of countryKey.roadKey
                `${countryKey}.${item["d_kod"]}`,
                item["d_name"]
            ],
            {
                "gos": countryKey
            }, null,
            "Не удалось загрузить список дорог"
        )

    return mergeOptionPromises([...countries.entries()].map(([key, _]) => fetchRoads(key)))
}


export const fetchStationsByDateAndRoads = async (date: DateRange,
                                                  roads: Options,
                                                  extraProperty?: Pair<string, string>): Promise<Options> =>
    mergeOptionPromises(
        [...mapRoadsByCountryCodeAndRoadCodes(roads)].map(([countryValue, roadValues]) =>
            fetchOptions("stanList", date,
                (item) => [item["stan"], item["pnazv"]],
                {
                    "gos": countryValue,
                    "dor": roadValues.join(","),
                    // [extraProperty.first]: extraProperty.second,
                    // [transferType === TransferType.BAGGAGE ? "pr_bo" : "prpop"]: "1"
                    "pr_bo": "1"
                }, null,
                "Не удалось загрузить список станций")
        )
    )


const fetchOptions = (listName: string,
                      date: DateRange,
                      parseItemFn: (item: any) => [OptionKey, OptionLabel],
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
                .map((item) => {
                    const parsed = parseItemFn(item)
                    // Trim the value
                    parsed[1] = parsed[1].trim()
                    return parsed
                }))
        })
        .catch(error => {
            popupHttpDataError(error, errorFooter)
            return new Map()
        })
        .finally(() => setCursorToDefault())
}

function mergeOptionPromises(promises: Promise<Options>[]): Promise<Options> {
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


function mapRoadsByCountryCodeAndRoadCodes (roads: Options) {
    const codesMap = new Map<OptionKey, string[]>()
    const parseRoadKey = (key: OptionKey) => {
        const roadValueEntries = key.split("."),
            countryValue = roadValueEntries[0],
            roadValue = roadValueEntries[1]

        if (!codesMap.has(countryValue)) {
            codesMap.set(countryValue, [])
        }
        codesMap.get(countryValue)?.push(roadValue)
    }
    roads.forEach((_, key) => parseRoadKey(key))

    return codesMap
}
export const form = {
    title: "title",
    submitText: "submitText",
    submitPath: "submitPath",
    statePath: "debug/statement",
    firstSection: {
        firstField: {
            type: "calendar",
            label: "firstField"
        },
        secondField: {
            type: "calendar",
            label: "secondField",
            range: true
        },
        thirdField: {
            type: "calendar",
            label: "thirdField",
            range: true,
            minDays: 5,
            maxDays: 15
        }
    },
    secondSection: {
        // firstField: {
        //     type: "select",
        //     label: "firstField",
        //     // serviceBankSource: {
        //     //     type: "carriers",
        //     //     propertiesTriggerKeys: {
        //     //         date: "firstSection.secondField"
        //     //     }
        //     // }
        // },
        // secondField: {
        //     type: "select",
        //     label: "secondField",
        //     endpointSource: {
        //         path: "demo/options",
        //         triggerKeys: ["firstSection.secondField", "secondSection.thirdField", "thirdSection.thirdField"]
        //     }
        // },
        // thirdField: {
        //     type: "select",
        //     label: "thirdField",
        //     multiple: true,
        //     search: true,
        //     endpointSource: {
        //         path: "demo/options"
        //     }
        // }
    },
    thirdSection: {
        firstField: {
            type: "switch",
            label: "firstField"
        },
        secondField: {
            type: "switch",
            label: "secondField"
        },
        thirdField: {
            type: "switch",
            label: "thirdField"
        }
    },
    departureSection: {
        title: "Отправления",
        switchField: {
            type: "switch",
            title: "Только страны СНГ и Балтии"
        },
        countriesField: {
            title: "Государства",
            type: "select",
            multiple: true,
            search: true,
            serviceBankSource: {
                type: "countries",
                propertiesTriggerKeys: {
                    date: "firstSection.firstField",
                    postSoviet: "departureSection.switchField"
                }
            }
        },
        roadsField: {
            title: "Дороги",
            type: "select",
            multiple: true,
            search: true,
            disableSelectAll: true,
            serviceBankSource: {
                type: "roads",
                propertiesTriggerKeys: {
                    date: "firstSection.firstField",
                    countries: "departureSection.countriesField"
                }
            }
        },
        // stationsField: {
        //     title: "Станции",
        //     type: "select",
        //     multiple: true,
        //     search: true,
        //     serviceBankSource: {
        //         type: "stations",
        //         propertiesTriggerKeys: {
        //             date: "firstSection.firstField",
        //             roads: "departureSection.roadsField"
        //         }
        //     }
        // }
    }
}
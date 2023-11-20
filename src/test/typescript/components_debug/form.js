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
        selectField: {
            type: "select",
            label: "secondField",
            endpointSource: {
                path: "demo/options",
                triggerKeys: ["firstSection.secondField", "secondSection.thirdField", "thirdSection.thirdField"]
            }
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
        firstField: {
            type: "select",
            label: "firstField",
            // serviceBankSource: {
            //     type: "carriers",
            //     propertiesTriggerKeys: {
            //         date: "firstSection.secondField"
            //     }
            // }
        },
        secondField: {
            type: "select",
            label: "secondField",
            endpointSource: {
                path: "demo/options",
                triggerKeys: ["firstSection.secondField", "secondSection.thirdField", "thirdSection.thirdField"]
            }
        },
        thirdField: {
            type: "select",
            label: "thirdField",
            multiple: true,
            search: true,
            endpointSource: {
                path: "demo/options"
            }
        }
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
    }
}
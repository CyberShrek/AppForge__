import App from "../../../main/typescript/components/Application.svelte"
import ReportSlot from "../../../main/typescript/components/formNslots/reportSlot/ReportSlot.svelte"
import {reportModel} from "./reportSlot"

const config = {
    code: "DEBUG",
    info: {
        updateDate: "updateDate",
        description: "description",
        additional: ""
    },
    form: {
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
    },
    mainSlot: {
        title: "Main"
    },
    lateralSlot: {
        title: "lateral"
    }
}

const appInfo = {
    name: "name",
    groupName: "groupName",
    path: 'path',
    groupPath: 'groupPath',
    version: 'version',
    releaseDate: 'releaseDate',
    updateDate: 'updateDate',
    technologistName: 'technologistName',
    technologistPhone: 'technologistPhone',
    technologistMail: 'technologistMail',
    helpPath: 'helpPath',
    comment: 'comment',
    instructionPath: 'instructionPath',
    description: 'description',
    additional: 'additional'
}

const app = new App({
    target: document.body,
    props: {
        config,
        appInfo
    }
});

const report = new ReportSlot({
    target: document.body,
    props: {
        config: {
            title: "Extra"
        },
        model: reportModel
    }
})

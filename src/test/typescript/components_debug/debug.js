import A from "../../../main/typescript/components/Application.svelte"

const config = {
    code: "DEBUG",
    info: {
        updateDate: "updateDate",
        description: "description",
        additional: ""
    },
    debugForm: {
        title: "title",
        submitText: "submitText",
        submitPath: "submitPath",
        statementPath: "statementPath",
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
                label: "firstField"
            },
            secondField: {
                type: "select",
                label: "secondField",
                endpointSource: {
                    path: "demo/options"
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

const app = new A({
    target: document.body,
    props: {
        config,
        appInfo
    }
});

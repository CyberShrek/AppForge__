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
            title: "firstSection",
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
        secondSection: {
            title: "secondSection",
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
        thirdSection: {
            title: "thirdSection",
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

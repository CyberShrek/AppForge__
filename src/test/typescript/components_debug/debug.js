import App from "../../../main/typescript/components/Application.svelte"
import ReportSlot from "../../../main/typescript/components/formNslots/reportSlot/ReportSlot.svelte"
import {reportModel} from "./reportSlot"
import {form} from "./form.js"

const config = {
    code: "DEBUG",
    info: {
        updateDate: "updateDate",
        description: "description",
        additional: ""
    },
    form,
    slots: {
        main: {
            title: "Main"
        },
        lateral: {
            title: "Lateral"
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

const app = new App({
    target: document.body,
    props: {
        config,
        appInfo
    }
});

// const report = new ReportSlot({
//     target: document.body,
//     props: {
//         config: {
//             title: "Extra"
//         },
//         model: reportModel
//     }
// })
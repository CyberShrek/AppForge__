import {resolveCSS} from "./utils/resolver"

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")

// Looking for main elements

const
    headerElement: HTMLElement = document.getElementById("header"),
    mainFormElement: HTMLFormElement = document.getElementById("main-form") as HTMLFormElement,
    reportSlotElements: Set<HTMLElement> = new Set(document.querySelectorAll("body > div.report"))

let reportSlotFragment

// Defining main fragments corresponding to main elements

if(headerElement !== null)
    import("./fragments/header/Header").then(fragment => new fragment.default({target: headerElement}))

if(mainFormElement !== null)
    import("./fragments/mainForm/MainForm").then(fragment => {
        const mainFormFragment = new fragment.default({target: mainFormElement})
        mainFormFragment.confirmButton.subscribe(value => console.log(value))
    })

// if(reportSlotElements !== null)
//     import("./fragments/report/ReportSlot").then(fragment => reportSlotElements
//         .forEach(reportSlotElement => reportSlotFragment = new fragment.default(reportSlotElement)))
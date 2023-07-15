import {resolveCSS} from "./utils/resolver"
import {confirmEvent} from "./entities/events"
import {fetchReport} from "./utils/api/reportsAPI"

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
    import("./fragments/Header").then(fragment => new fragment.default(headerElement))

if(mainFormElement !== null)
    import("./fragments/mainForm/MainForm").then(fragment => {
        const mainForm = new fragment.default(mainFormElement)
        mainFormElement.addEventListener(confirmEvent.type, () => {
            // TODO temporary piece of shit
            fetchReport("forged", mainForm.getValues()).then(
                report => reportSlotFragment.setReport(report)
            )
        })
    })

if(reportSlotElements !== null)
    import("./fragments/report/ReportSlot").then(fragment => reportSlotElements
        .forEach(reportSlotElement => reportSlotFragment = new fragment.default(reportSlotElement)))
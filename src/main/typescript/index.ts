import {resolveCSS} from "./utils/resolver"
import {popupMessage} from "./utils/modal";

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")

// Looking for main elements

const
    headerElement: HTMLElement = document.getElementById("header"),
    mainFormElement: HTMLFormElement = document.getElementById("main-form") as HTMLFormElement,
    reportSlotElements: Set<HTMLElement> = new Set(document.querySelectorAll("body > div.report"))

// Defining main fragments corresponding to main elements

if(headerElement !== null)
    import("./fragments/Header").then(fragment => new fragment.default(headerElement))

if(mainFormElement !== null)
    import("./fragments/mainForm/MainForm").then(fragment => {
        const mainForm = new fragment.default(mainFormElement)

        // mainForm.sections.get("period").fields.get("list").subscribeOnField("period", "range",
        //     value => popupMessage("Выбрано", value))
    })

if(headerElement !== null)
    import("./fragments/report/ReportSlot").then(fragment => reportSlotElements
        .forEach(reportSlotElement => new fragment.default(reportSlotElement)))
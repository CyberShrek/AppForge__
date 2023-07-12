import {resolveCSS} from "../../../../utils/resolver"
import {easepick} from "@easepick/core"
import {RangePlugin} from "@easepick/range-plugin"
import {LockPlugin} from "@easepick/lock-plugin"
import {AmpPlugin} from "@easepick/amp-plugin"
import {DateTime} from "@easepick/datetime"
import {stringifyDate, numberOf} from "../../../../utils/misc"
import {Field} from "./Field"
import {Section} from "../Section"

resolveCSS("third-party/easepick")

export default class Datepicker extends Field{

    value: DateRange
    constructor(public core: HTMLElement,
                public section: Section) { super(core, section)

        applyPicker(core, (startDate, endDate) => {
            this.value = {
                start: stringifyDate(startDate),
                end: stringifyDate(endDate)
            }
            this.dispatchUpdate()
        })
    }
}

function applyPicker(pickerElement: HTMLElement, onSelect: (startDate, endDate) => void){
    new easepick.create({
        element: pickerElement,
        format: "DD.MM.YYYY",
        calendars: 2,
        grid: 2,
        zIndex: 100,
        plugins: [RangePlugin, LockPlugin, AmpPlugin],
        lang: 'ru',
        AmpPlugin: {
            darkMode: false,
            resetButton: true,
            dropdown: {
                minYear: 2010, maxYear: null, months: true, years: true
            }
        },
        RangePlugin: {
            startDate: new DateTime(),
            endDate: new DateTime(),
            locale: {
                one: 'день',
                few: 'дня',
                many: 'дней'
            },
            delimiter: " - "
        },
        LockPlugin: {
            minDays: 1,
            maxDays: numberOf(pickerElement.getAttribute("max-days"))
        },
        css: [
            "css/third-party/easepick.css"
        ],
        setup(picker) {
            picker.on("select", (e) => {
                onSelect(e.detail.start, e.detail.end)
                setTimeout(() => picker.hide(), 10)
            })
        }
    })
}
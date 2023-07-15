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

    value: DateRange = [
        stringifyDate(new Date()),
        stringifyDate(new Date())]
    constructor(core: HTMLElement,
                public section: Section) { super(core, section)

        applyPicker(core, this.value, (startDate, endDate) => {
            this.dispatchUpdate()
        })
    }
}

function applyPicker(core: HTMLElement, defaultValue: DateRange, onSelect: (startDate, endDate) => void){
    new easepick.create({
        element: core,
        format: "DD.MM.YYYY",
        calendars: 2,
        grid: 2,
        zIndex: 100,
        plugins: [AmpPlugin, RangePlugin, LockPlugin],
        lang: 'ru',
        AmpPlugin: {
            darkMode: false,
            resetButton: true,
            dropdown: {
                minYear: 2010, maxYear: null, months: true, years: true
            }
        },
        RangePlugin: {
            startDate: new DateTime(defaultValue[0]),
            endDate: new DateTime(defaultValue[1]),
            locale: {
                one: 'день',
                few: 'дня',
                many: 'дней'
            },
            delimiter: " - "
        },
        LockPlugin: {
            minDays: 1,
            maxDays: numberOf(core.getAttribute("max-days"))
        },
        css: [
            "app-forge/css/third-party/easepick.css"
        ],
        setup(picker) {
            picker.on("select", (e) => {
                onSelect(e.detail.start, e.detail.end)
                setTimeout(() => picker.hide(), 10)
            })
        }
    })
}
import {resolveCSS} from "../../util/resolver"
import {numberOf, stringifyDate} from "../../util/data"
import {easepick} from "@easepick/core"
import {AmpPlugin} from "@easepick/amp-plugin"
import {RangePlugin} from "@easepick/range-plugin"
import {LockPlugin} from "@easepick/lock-plugin"
import {DateTime} from "@easepick/datetime"
import {Fragment} from "../Fragment"

resolveCSS("third-party/easepick")

interface DateInputConfig {
    maxDays?: number
    defaultRange?: DateRange
}

export default class Datepicker extends Fragment{

    pickedDateRange: DateRange = this.config.defaultRange

    constructor(private config: DateInputConfig, onPick: (range: DateRange) => void) {
        super(`
            <div class="datepicker"></div>
        `)

        if(!config.defaultRange)
            config.defaultRange = [stringifyDate(new Date()), stringifyDate(new Date())]

        applyPicker(this.root, config, dateRange => {
            this.pickedDateRange = dateRange
            onPick(dateRange)
        })
    }
}

function applyPicker(core: HTMLElement, config: DateInputConfig, onSelect: (dateRange: DateRange) => void){
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
            startDate: new DateTime(config.defaultRange[0]),
            endDate: new DateTime(config.defaultRange[1]),
            locale: {
                one: 'день',
                few: 'дня',
                many: 'дней'
            },
            delimiter: " - "
        },
        LockPlugin: {
            minDays: 1,
            maxDays: config.maxDays
        },
        css: [
            "/appforge/css/third-party/easepick.css"
        ],
        setup(picker) {
            picker.on("select", (e) => {
                onSelect([stringifyDate(e.detail.start), stringifyDate(e.detail.end)])
                setTimeout(() => picker.hide(), 10)
            })
        }
    })
}
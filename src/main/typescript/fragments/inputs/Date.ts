import {resolveCSS} from "../../utils/resolver"
import {numberOf, stringifyDate} from "../../utils/misc"
import {easepick} from "@easepick/core"
import {AmpPlugin} from "@easepick/amp-plugin"
import {RangePlugin} from "@easepick/range-plugin"
import {LockPlugin} from "@easepick/lock-plugin"
import {DateTime} from "@easepick/datetime"
import {InputFragment} from "../abstract/InputFragment"
import {createDivElement} from "../../utils/DOMWizard"

resolveCSS("third-party/easepick")

export default class Date extends InputFragment<DateRange>{

    constructor(location: FragmentLocation, config: DateInputConfig) {
        super(location)
        this.core = createDivElement({class: "datepicker"})
        if(!config.defaultRange)
            config.defaultRange = [stringifyDate(new Date()), stringifyDate(new Date())]

        this.value = config.defaultRange
        applyPicker(this.core, config, dateRange => {
            this.value = dateRange
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
            "app-forge/css/third-party/easepick.css"
        ],
        setup(picker) {
            picker.on("select", (e) => {
                onSelect([e.detail.start, e.detail.end])
                setTimeout(() => picker.hide(), 10)
            })
        }
    })
}
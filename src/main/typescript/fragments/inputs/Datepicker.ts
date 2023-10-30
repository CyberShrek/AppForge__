import {stringifyDate, valueOrDefault} from "../../util/data"
import {easepick} from "@easepick/core"
import {AmpPlugin} from "@easepick/amp-plugin"
import {RangePlugin} from "@easepick/range-plugin"
import {LockPlugin} from "@easepick/lock-plugin"
import {DateTime} from "@easepick/datetime"
import {Fragment} from "../Fragment"
import {Button} from "./Button"

const defaultDateTime = new DateTime()

export default class Datepicker extends Fragment{

    pickedDateRange: FormattedDate = easepickDetailToDateRange({
            date: defaultDateTime,
            start: defaultDateTime,
            end: defaultDateTime
        },
        this.config.range
    )

    pickDateRange(range: FormattedDate){
        if(this.config.range && this.easepick){
            this.easepick.setStartDate(range[0])
            this.easepick.setEndDate(range[1])
        } else
            this.easepick.setDate(range[0])
    }

    private easepick: easepick.Core

    constructor(private config: CalendarConfig, onPick: (range: FormattedDate) => void) {
        super(`    
            <div class="datepicker"><input></div>
        `)

        const inputElement = this.root.querySelector("input")

        this.append(new Button({text: "📅"}, () => inputElement.click()))

        this.onMount( () => {
            this.easepick = createPicker(inputElement, config, dateRange => {
                this.pickedDateRange = dateRange
                onPick(dateRange)
            })
        })
    }
}

function createPicker(core: HTMLElement, config: CalendarConfig, onSelect: (dateRange: FormattedDate) => void) {
    return new easepick.create({
        element: core,
        calendars: config.range ? 2 : 1,
        grid: 2,
        zIndex: 100,
        plugins: [config.range ? RangePlugin : null, AmpPlugin, LockPlugin],
        lang: 'ru',
        date: defaultDateTime,
        RangePlugin: config.range ? {
            startDate: defaultDateTime,
            endDate: defaultDateTime,
            locale: {
                one: 'день',
                few: 'дня',
                many: 'дней'
            },
            delimiter: " - "
        } : null,
        AmpPlugin: {
            darkMode: false,
            resetButton: true,
            dropdown: {
                minYear: valueOrDefault(config.minYear, 2010), maxYear: config.maxYear, months: true, years: true
            }
        },
        LockPlugin: {
            minDays: config.minDays,
            maxDays: config.maxDays
        },
        css: [
            "/appforge/css/third-party/easepick.css"
        ],
        setup(picker) {
            picker.on("select", (e) => {
                onSelect(easepickDetailToDateRange(e.detail, config.range))
                setTimeout(() => picker.hide(), 10)
            })
        }
    })
}

function easepickDetailToDateRange(detail: any, range: boolean): FormattedDate{
    return range
        ? [stringifyDate(detail.start), stringifyDate(detail.end)]
        : stringifyDate(detail.date)
}
import {easepick} from "@easepick/core"
import {RangePlugin} from "@easepick/range-plugin"
import {AmpPlugin} from "@easepick/amp-plugin"
import {LockPlugin} from "@easepick/lock-plugin"
import {stringifyDate, valueOrDefault} from "../util/data"
import {stylesLocation} from "../properties"
import {InputModule} from "./abstract/InputModule"
import {DateTime} from "@easepick/datetime"

export class EasepickModule extends InputModule<FormattedDate>{

    constructor(private rootElement: HTMLElement,
                private config: CalendarConfig) {

        super(pickedDate => {
            Array.isArray(pickedDate)                                       // @ts-ignore Resolved by module import
                ?  pickedDate[0] && rootElement.setStartDate(pickedDate[0]) // @ts-ignore Resolved by module import
                || pickedDate[1] && rootElement.setEndDate(pickedDate[1])   // @ts-ignore Resolved by module import
                : rootElement.setDate(pickedDate)
        })

        new easepick.create({
            element: rootElement,
            calendars: config.range ? 2 : 1,
            grid: 2,
            zIndex: 100,
            plugins: [config.range ? RangePlugin : null, AmpPlugin, LockPlugin],
            lang: 'ru',
            date: new DateTime(),
            RangePlugin: config.range ? {
                startDate: new DateTime(),
                endDate: new DateTime(),
                locale: {
                    one: 'день',
                    few: 'дня',
                    many: 'дней'
                },
                delimiter: " - "
            } : null,
            AmpPlugin: {
                darkMode: false,
                dropdown: {
                    minYear: valueOrDefault(config.minYear, 2010), maxYear: config.maxYear, months: true, years: true
                }
            },
            LockPlugin: {
                minDays: config.minDays,
                maxDays: config.maxDays
            },
            css: [
                stylesLocation + "third-party/easepick.css"
            ],
            setup(picker) {
                picker.on("select", (e) => {
                    super.setValue(this.easepickDetailToDateRange(e.detail))
                    setTimeout(() => picker.hide(), 10)
                })
            }
        })
    }

    private easepickDetailToDateRange(detail: any): FormattedDate{
        return this.config.range
            ? [stringifyDate(detail.start), stringifyDate(detail.end)]
            : stringifyDate(detail.date)
    }
}
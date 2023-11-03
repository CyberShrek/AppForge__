import {easepick} from "@easepick/core"
import {RangePlugin} from "@easepick/range-plugin"
import {AmpPlugin} from "@easepick/amp-plugin"
import {LockPlugin} from "@easepick/lock-plugin"
import {valueOrDefault} from "../util/data"
import {stylesLocation} from "../properties"
import {InputModule} from "./abstract/InputModule";

export class EasepickModule extends InputModule<FormattedDate>{

    constructor(private rootElement: HTMLElement,
                config: CalendarConfig) {

        new easepick.create({
            element: rootElement,
            calendars: config.range ? 2 : 1,
            grid: 2,
            zIndex: 100,
            plugins: [config.range ? RangePlugin : null, AmpPlugin, LockPlugin],
            lang: 'ru',
            date: pickedDate[0],
            RangePlugin: config.range ? {
                startDate: pickedDate[0],
                endDate: pickedDate[1],
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
                    pickedDate = easepickDetailToDateRange(e.detail)
                    setTimeout(() => picker.hide(), 10)
                })
            }
        })
    }

    private readonly onChangeCallbacks: ((pickedDate: FormattedDate) => void)[] = []

    onChange = (callback: (pickedKeys: typeof this.pickedKeys) => void) => this.onChangeCallbacks.push(callback)
}
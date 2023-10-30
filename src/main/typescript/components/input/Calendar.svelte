<script lang="ts">
    import {stringifyDate, valueOrDefault} from "../../util/data"
    import Button from "./Button.svelte"
    import {onMount} from "svelte"
    import {easepick} from "@easepick/core"
    import {RangePlugin} from "@easepick/range-plugin"
    import {AmpPlugin} from "@easepick/amp-plugin"
    import {LockPlugin} from "@easepick/lock-plugin"
    import {stylesLocation} from "../../properties"
    import {DateTime} from "@easepick/datetime"

    export let
        config: CalendarConfig,
        pickedDate: FormattedDate = easepickDetailToDateRange({
            date: new DateTime(),
            start: new DateTime(),
            end: new DateTime()
        })

    let easepickRoot: HTMLInputElement

    onMount(() => {
        new easepick.create({
            element: easepickRoot,
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
                stylesLocation + "third-party/easepick.css"
            ],
            setup(picker) {
                picker.on("select", (e) => {
                    pickedDate = easepickDetailToDateRange(e.detail)
                    setTimeout(() => picker.hide(), 10)
                })
            }
        })
    })

    function easepickDetailToDateRange(detail: any): FormattedDate{
        return config.range
            ? [stringifyDate(detail.start), stringifyDate(detail.end)]
            : stringifyDate(detail.date)
    }

</script>

<div class="datepicker">
    <input bind:this={easepickRoot}>
    <Button text="📅"/>
</div>
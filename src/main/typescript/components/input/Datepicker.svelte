<script lang="ts">
    import {stringifyDate, valueOrDefault} from "../../util/data"
    import Button from "./Button.svelte"
    import {onMount} from "svelte";
    import {RangePlugin} from "@easepick/range-plugin";
    import {AmpPlugin} from "@easepick/amp-plugin";
    import {LockPlugin} from "@easepick/lock-plugin";

    export let
        config: DatepickerConfig,
        pickedDateRange: DateRange

    let inputRoot: HTMLInputElement,
        easepick: easepick.Core

    function easepickDetailToDateRange(detail: any, range: boolean): DateRange{
        return range
            ? [stringifyDate(detail.start), stringifyDate(detail.end)]
            : [stringifyDate(detail.date)]
    }

    onMount(() => {
        new easepick.create({
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
    })

</script>

<div class="datepicker">
    <input bind:this={inputRoot}>
    <Button text="📅"/>
</div>
<script lang="ts">

    import {resolveCSS, resolveJS} from "../../util/resolver"
    import {onMount} from "svelte"

    resolveCSS("third-party/virtual-select")
    const virtualSelectModulePromise = resolveJS("third-party/virtual-select.min")

    export let
        config: SelectConfig

    let rootElement: HTMLDivElement

    onMount(() => {
        // @ts-ignore !!! Resolved by html import !!!
        VirtualSelect.init({
            ele: rootElement,
            additionalClasses: "multiselect",
            disabled: true,
            autofocus: false,
            markSearchResults: true,
            zIndex: 100,
            optionsCount: 6,
            multiple: !!config.multiple,
            search: !!config.search,
            hasOptionDescription: !!config.showCodes,
            disableSelectAll: !!config.disableSelectAll,
            maxValues: config.maxValues,
            maxWidth: "100%",
            position: "bottom",
            disableAllOptionsSelectedText: true,

            placeholder: "",
            noOptionsText: "Варианты не найдены",
            noSearchResultsText: "Результатов не найдено",
            selectAllText: "Выбрать все",
            searchPlaceholderText: "Поиск...",
            optionsSelectedText: "(выбрано)",
            optionSelectedText: "вариант выбран",
            allOptionsSelectedText: "Все",
            clearButtonText: "Очистить",
            moreText: "ещё..."
        })
    })

</script>

<div class="select" bind:this={rootElement}>

</div>
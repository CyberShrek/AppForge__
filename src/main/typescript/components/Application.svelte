<script lang="ts">

    import {resolveStyle} from "../util/resolver"
    import Header from "./navigation/Header.svelte"
    import {extractJsonItemsWithSuffix} from "../util/data"
    import FormNSlots from "./formNslots/FormNSlots.svelte"
    import Fix from "./misc/Fix.svelte";
    import Button from "./input/Button.svelte";
    import ToTopButton from "./misc/ToTopButton.svelte";

    export let
        config:    AppConfig,
        appInfo:   AppInfo,
        userInfo:  UserInfo

    let scrollY: number

    $: if(!appInfo.updateDate)
        appInfo.updateDate = config.info.updateDate

    document.body.style.display = "none"

    // Must be loaded only once
    Promise.all([
        resolveStyle("global"),
        resolveStyle("navigation"),
        resolveStyle("inputs"),
        resolveStyle("states"),
        resolveStyle("misc")
    ]).then(() => document.body.style.display = "")

</script>

<Header {appInfo}></Header>
{#if config.form}
    <FormNSlots formConfig={config.form}
                reportConfigsObject={extractJsonItemsWithSuffix(config, "Slot")}/>
{/if}

<svelte:window bind:scrollY/>

{#if scrollY > 100}
    <Fix right={true}
         bottom={true}>
        <ToTopButton/>
    </Fix>
{/if}
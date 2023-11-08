<script lang="ts">

    import {resolveStyle} from "../util/resolver"
    import Header from "./navigation/Header.svelte"
    import {extractJsonItemsWithSuffix} from "../util/data"
    import FormNSlots from "./formNslots/FormNSlots.svelte"

    export let
        config:    AppConfig,
        appInfo:   AppInfo,
        userInfo:  UserInfo

    // Must be loaded only once
    const cssPromises = Promise.all([
        resolveStyle("global"),
        resolveStyle("navigation"),
        resolveStyle("inputs"),
        resolveStyle("states"),
        resolveStyle("misc")
    ])

    // if(!config.complex || !Array.isArray(config.complex))
    //     config.complex = []
    //
    // if(config.form)
    //     config.complex.push({
    //         title: " ",
    //         form: config.form,
    //         ...extractJsonItemsWithSuffix(config, "Slot")
    //     })

</script>

<Header {appInfo}></Header>

{#if config.form}
    <FormNSlots formConfig={config.form}
                reportConfigsObject={extractJsonItemsWithSuffix(config, "Slot")}/>
{/if}
<script lang="ts">

    import {resolveStyle} from "../util/resolver"
    import Header from "./navigation/Header.svelte"
    import {extractJsonItemsWithSuffix, valueOrDefault} from "../util/data"
    import NavContainer from "./navigation/NavContainer.svelte"
    import NavTab from "./navigation/NavTab.svelte"
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

    if(!config.complex || !Array.isArray(config.complex))
        config.complex = []

    if(config.form)
        config.complex.push({
            title: " ",
            form: config.form,
            ...extractJsonItemsWithSuffix(config, "Slot")
        })

</script>

<Header {appInfo}></Header>

<NavContainer>
    {#each config.complex as boxConfig}
        <NavTab text={boxConfig.title}>
            <FormNSlots formConfig={boxConfig.form}
                        reportConfigsObject={extractJsonItemsWithSuffix(boxConfig, "Slot")}/>
        </NavTab>
    {/each}
</NavContainer>
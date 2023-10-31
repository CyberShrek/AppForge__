<script lang="ts">

    import {resolveStyle} from "../util/resolver"
    import Header from "./navigation/Header.svelte"
    import Form from "./form/Form.svelte"
    import {extractJsonItemsWithSuffix, valueOrDefault} from "../util/data"
    import NavContainer from "./navigation/NavContainer.svelte"
    import NavTab from "./navigation/NavTab.svelte"

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
        resolveStyle("third-party/animate"),
        resolveStyle("misc")
    ])

    let formConfigsObject = config ? extractJsonItemsWithSuffix(config, "Form") as {[fieldKey: string]: FormConfig} : {}

</script>

<Header {appInfo}></Header>

<NavContainer>
    {#each Object.keys(formConfigsObject) as formKey}
        <NavTab text={valueOrDefault(formConfigsObject[formKey].title, formKey)}>
            <Form config={formConfigsObject[formKey]}/>
        </NavTab>
    {/each}
</NavContainer>
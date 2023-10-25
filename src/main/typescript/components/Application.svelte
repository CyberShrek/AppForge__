<script lang="ts">

    import {resolveCSS} from "../util/resolver"
    import Header from "./navigation/Header.svelte"
    import NavContainer from "./navigation/NavContainer.svelte"
    import NavTab from "./navigation/NavTab.svelte"

    export let
        config:    AppConfig,
        appInfo:   AppInfo,
        userInfo:  UserInfo

    // Must be loaded only once
    const cssPromises = Promise.all([
        resolveCSS("global"),
        resolveCSS("navigation"),
        resolveCSS("inputs"),
        resolveCSS("states"),
        resolveCSS("third-party/animate"),
        resolveCSS("misc")
    ])

</script>

<Header {appInfo}></Header>

<NavContainer>
    <NavTab text="1">
        dsdc
    </NavTab>
    <NavTab text="2">
        ffff333
    </NavTab>
    <NavTab text="3">
        ddfs
    </NavTab>

</NavContainer>
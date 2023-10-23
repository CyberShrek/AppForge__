<script lang="ts">

    import {resolveCSS} from "../util/resolver"
    import Header from "./navigation/Header.svelte"

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

<Header appInfo></Header>
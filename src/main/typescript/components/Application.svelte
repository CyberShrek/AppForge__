<script lang="ts">

    import {resolveCSS} from "../util/resolver"
    import Header from "./navigation/Header.svelte"
    import NavContainer from "./navigation/NavContainer.svelte";

    export let
        config:    AppConfig,
        appInfo:   AppInfo = {},
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

<!--<NavContainer>-->
<!--    <div>-->
<!--        1-->
<!--    </div>-->
<!--    <div>-->
<!--        2-->
<!--    </div>-->
<!--    <div>-->
<!--        3-->
<!--    </div>-->
<!--</NavContainer>-->
import {appInfo, retrieveAppInfo} from "./store/appInfo"
import {retrieveUserInfo, userInfo} from "./store/userInfo"
// @ts-ignore
import App from "./components/Application.svelte"
import {appConfig} from "./store/appConfig";

// The application will be created only after load of appInfo and userInfo
Promise.all([retrieveAppInfo(), retrieveUserInfo()]).then( () => {
    new App({
        target: document.body,
        props: {
            config: appConfig,
            appInfo,
            userInfo
        }
    })
})
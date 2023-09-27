import {retrieveAppInfo} from "./store/appInfo"
import {retrieveUserInfo} from "./store/userInfo"

// The application will be created only after load of appInfo and userInfo
Promise.all([retrieveAppInfo(), retrieveUserInfo()]).then( () => {
    import("./fragments/applicatons/ForgedApplication").then(module => {
        if (document.readyState === "complete")
            new module.ForgedApplication()
    })
})
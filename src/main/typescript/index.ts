import {UserCheck} from "./api/UserCheck"


new UserCheck().fetch().then(() => {
        import("./fragments/applicatons/IndexApplication").then(IndexApplication =>
            // @ts-ignore
            new IndexApplication())
    }
)


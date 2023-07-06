import wretch from "wretch"
import {getAppForgeUrl} from "../store";

export const fetchApplicationInfo=() =>
    wretch(getAppForgeUrl()+"/info")
        .get()
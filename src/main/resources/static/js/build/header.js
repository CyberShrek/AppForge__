/* tslint:disable-next-line */
import wretch from "wretch";
import { appForgeUrl } from "./index";
const header = document.getElementById("header");
const fetchApplicationInfo = () => wretch(appForgeUrl + "/info2")
    .get();
fetchApplicationInfo();

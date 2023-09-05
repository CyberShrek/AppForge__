import Header from "../main/Header"
import {resolveCSS} from "../../util/resolver"
import {Fragment} from "../Fragment"
import {appInfoPromise} from "../../store/appInfo"
import Form from "../form/Form";
import {appConfig} from "../../store/appConfig";
import {NavigationContainer} from "../navigation/NavigationContainer";

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")
resolveCSS("misc")

export class ForgedApplication extends Fragment{

    readonly header = new Header()
    // readonly reportSlots: Map<string, ReportSlot> = new Map()

    constructor(root = document.body) {
        super(root)

        this.append(this.header, this.createMainForm())

        appInfoPromise.then(appInfo => {
            if(appInfo) {
                document.title = appInfo.name
                this.header.setAppInfo(appInfo)
            }
        })
    }

    private createMainForm() : Form | NavigationContainer{
        if (appConfig.forms) {
            const formContainer = new NavigationContainer()
            Object.entries(appConfig.forms).forEach(([formName, formConfig]) =>
                formContainer.createTab(formName, new Form(formConfig))
            )
            return formContainer
        } else
            return new Form(appConfig.form)
    }

    // private createReportSlots=(): typeof this.reportSlots => new Map(
    //     [...document.body.querySelectorAll<HTMLDivElement>("div.report")].map(reportSlotElement =>
    //         [reportSlotElement.getAttribute("key"), new ReportSlot({target: reportSlotElement})])
    // )
}
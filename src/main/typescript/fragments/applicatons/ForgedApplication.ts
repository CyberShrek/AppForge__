import Header from "../main/Header"
import {resolveCSS} from "../../util/resolver"
import {Fragment} from "../Fragment"
import {appInfoPromise, retrieveAppInfo} from "../../store/appInfo"
import Form from "../form/Form";
import {appConfig} from "../../store/appConfig";
import {NavigationContainer} from "../navigation/NavigationContainer"
import {ReportAccessor} from "../../api/ReportAccessor";
import ReportSlot from "../report/ReportSlot";


const cssPromises = Promise.all([
    resolveCSS("global"),
    resolveCSS("navigation"),
    resolveCSS("inputs"),
    resolveCSS("states"),
    resolveCSS("third-party/animate"),
    resolveCSS("misc")
])

export class ForgedApplication extends Fragment {

    readonly header = new Header()

    readonly formContainer: NavigationContainer = new NavigationContainer()

    readonly reportSlots: Map<string, ReportSlot> = new Map()

    constructor(root = document.body) {
        retrieveAppInfo()
        cssPromises.then(() => this.show())

        super(root)
        this.append(this.header, this.formContainer)
        this.hide()

        // Determining forms and slots
        for (const key in appConfig) {
            let config
            if(key.endsWith("Form")) {
                config = appConfig[key] as FormConfig
                this.formContainer.createTab(config.title, this.createForm(config))
            } else if(key.endsWith("Slot")) {
                config = appConfig[key] as ReportSlotConfig
                this.reportSlots.set(key, new ReportSlot(this, config))
            }
        }

        appInfoPromise.then(appInfo => {
            if (appInfo) {
                document.title = appInfo.name
                this.header.setAppInfo(appInfo)
            }
        })
    }

    private createForm(config: FormConfig) : Form{
        const reportAccessor = new ReportAccessor(config.submitPath)
        const form = new Form(config)
        form.onSubmit = (jsonValues) => {
            form.submitButton.disable()
            reportAccessor.fetch(jsonValues).then(reportModels => {
                for (const key in reportModels) {
                    this.reportSlots.get(key).applyReport(reportModels[key], jsonValues)
                }
                form.submitButton.enable()})
        }
        return form
    }
}
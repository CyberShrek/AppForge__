import Header from "../main/Header"
import {resolveCSS} from "../../util/resolver"
import {Fragment} from "../Fragment"
import {appInfo} from "../../store/appInfo"
import Form from "../form/Form";
import {appConfig} from "../../store/appConfig";
import {NavigationContainer} from "../navigation/NavigationContainer"
import {Report} from "../../api/Report"
import ReportSlot from "../report/ReportSlot"

// Must be loaded only once
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
        super(root)
        this.hide()
        cssPromises.then(() => this.show())
        this.append(this.header, this.formContainer)

        // Applying appInfo
        document.title = appInfo.name
        this.header.setAppInfo(appInfo)
        let firstTabTitle: string

        // Determining forms and slots
        for (const key in appConfig) {
            let config
            if(key.endsWith("Form")) {
                config = appConfig[key] as FormConfig
                firstTabTitle = firstTabTitle ? firstTabTitle : config.title
                this.formContainer.createTab(config.title,
                    () => this.selectSlotsAssociatedWithForm(key),
                    this.createForm(config)
                )
            } else if(key.endsWith("Slot")) {
                config = appConfig[key] as ReportSlotConfig
                const reportSlot = new ReportSlot(this, config)
                this.reportSlots.set(key, reportSlot)
                if(config.associatedWith)
                    reportSlot.hide()
            }
        }
        // Pick the first tab
        this.formContainer.pickTab(firstTabTitle)
    }

    private createForm(config: FormConfig) : Form{
        const reportAccessor = new Report(config.submitPath)
        const form = new Form(config)
        form.onSubmit = (jsonValues, prettyValues) => {
            form.submitButton.disable()
            const formSnapshot = form
            reportAccessor.fetch(jsonValues).then(reportModel => {
                this.reportSlots.get(reportModel.slot)?.applyReport(reportModel as ReportModel, formSnapshot)
                form.submitButton.enable()
            })
        }
        return form
    }

    private selectSlotsAssociatedWithForm(formKey: string){
        Array.from(this.reportSlots.values()).forEach(slot => {
            if(slot.config.associatedWith === formKey || !slot.config.associatedWith)
                slot.show()
            else
                slot.hide()
        })
    }
}
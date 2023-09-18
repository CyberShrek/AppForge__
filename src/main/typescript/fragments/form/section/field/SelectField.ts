import {Field} from "./Field"
import Select from "../../../inputs/Select"
import {Section} from "../Section"
import {concatMaps} from "../../../../util/data"
import {ServiceBankOptionsAccessor} from "../../../../api/ServiceBankOptionsAccessor"
import Form from "../../Form"

export class SelectField extends Field<Options>{

    protected selectFragment: Select

    private options: Options = new Map()
    private serviceBankOptions: Options = new Map()

    constructor(section: Section, private config: SelectFieldConfig) {
        const select = new Select(config, options => this.triggerValueChange(options))
        super(section, config, true, new Map())
        this.append(select)
        this.selectFragment = select
    }

    override triggerValueChange(newValue: Options | OptionKey[]) {
        this.selectFragment.modulePromise.then(() => {
            if(newValue instanceof Map)
                super.triggerValueChange(newValue)
            else {
                this.selectFragment.pickOptions(newValue)
                super.triggerValueChange()
            }
        })
    }

    setOptions(options: Options){
        this.options = options
        this.updateOptions()
    }

    setupServiceBank(setup: ServiceBankSetup, initValues?: OptionKey[]) {
        setupServiceBankRetrieving(this.parent.parent, setup,
                options => {
                    this.serviceBankOptions = options
                    this.updateOptions()
                    if(initValues) {
                        this.triggerValueChange(initValues)
                        initValues = null
                    }
                })
    }

    private updateOptions(){
        this.selectFragment.options = concatMaps(this.options, this.serviceBankOptions)
    }
}

function setupServiceBankRetrieving(form: Form, config: ServiceBankSetup, onFetch: (options: Options) => void){
    const sourceFields = config.propertiesSources ? form.findFields(Array.from(Object.values(config.propertiesSources))) : null
    const optionsAccessor = new ServiceBankOptionsAccessor(config.type)
    subscribeToFields(sourceFields, () => {
        const properties: typeof config.properties = {...config.properties}
        // Remapping
        Object.entries(config.propertiesSources).forEach(entry => {
            const sourceField = sourceFields?.get(entry[1])
            if (sourceField) {
                const json = sourceField.jsonValue
                properties[entry[0]] = sourceField instanceof SelectField && json !== null ? Object.keys(json) : json
            }
        })
        optionsAccessor
            .fetch(properties)
            .then(options => options ? onFetch(options) : options)
    })
}

function subscribeToFields(fieldsMap: Map<string, Field<any>> | Field<any>[], onChange: () => void, runAfter = true){
    fieldsMap?.forEach(field =>
        field.onValueChange(() => {
            onChange()
        })
    )
    if(runAfter)
        onChange()
}
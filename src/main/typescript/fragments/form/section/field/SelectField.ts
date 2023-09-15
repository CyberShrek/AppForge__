import {Field} from "./Field"
import Select from "../../../inputs/Select"
import {Section} from "../Section"
import {concatMaps, jsonifyFields, valueOrDefault} from "../../../../util/data"
import {EndpointOptionsAccessor} from "../../../../api/EndpointOptionsAccessor"
import {ServiceBankOptionsAccessor} from "../../../../api/ServiceBankOptionsAccessor"
import Form from "../../Form"
import {create} from "../../../../util/domWizard"

export class SelectField extends Field<Options>{

    protected selectFragment: Select

    constructor(section: Section, private config: SelectFieldConfig) {
        const select = new Select(config, options => this.triggerValueChange(options))
        super(section, new Map())
        if(config.label) this.append(create(`<p>${config.label}</p>`))
        this.append(select)
        this.selectFragment = select
    }

    override triggerValueChange(newValue: Options | OptionKey[]) {
        if(newValue instanceof Map)
            super.triggerValueChange(newValue)
        else {
            this.selectFragment.pickOptions(newValue)
            super.triggerValueChange()
        }
    }

    setOptions(options: Options){
        this.selectFragment.options = options
    }

    setupServiceBank(setup: ServiceBankSetup) {
        setupServiceBankRetrieving(this.parent.parent, setup, options => this.setOptions(options))
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
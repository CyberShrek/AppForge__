import {Field} from "./Field"
import Select from "../../../inputs/Select"
import {Section} from "../Section"
import {concatMaps, jsonifyFields} from "../../../../util/data"
import {EndpointOptionsAccessor} from "../../../../api/accessors/EndpointOptionsAccessor"
import {ServiceBankOptionsAccessor} from "../../../../api/accessors/ServiceBankOptionsAccessor"
import Form from "../../Form"

export class SelectField extends Field<Options>{

    protected selectFragment: Select

    constructor(section: Section, private config: SelectFieldConfig) {
        const select = new Select(config, options => this.triggerValueChange(options))
        super(section, `<p>${config.label}</p>`, select)
        this.selectFragment = select
    }

    startOptionsRetrieving(){
        let endpointOptions: Options = new Map(),
            serviceBankOptions: Options = new Map()
        const update=() => this.selectFragment.options = concatMaps(endpointOptions, serviceBankOptions),
            form = this.section.form,
            endpointConfig = this.config.optionsSources?.endpoint,
            serviceBankConfig = this.config.optionsSources?.serviceBank

        if(endpointConfig)
            setupEndpointRetrieving(form, endpointConfig, options => {endpointOptions = options; update()})
        if(serviceBankConfig)
            setupServiceBankRetrieving(form, serviceBankConfig, options => {serviceBankOptions = options; update()})
    }


}
function setupEndpointRetrieving(form: Form, config: EndpointOptionsConfig, onFetch: (options: Options) => void){
    const sourceFields = form.findFields(config.propertiesSources)
    const optionsAccessor = new EndpointOptionsAccessor(config.path)
    subscribeToFields(sourceFields, () => optionsAccessor
        .fetch(jsonifyFields(sourceFields))
        .then(options => options ? onFetch(options) : options))
}

function setupServiceBankRetrieving(form: Form, config: ServiceBankConfig, onFetch: (options: Options) => void){
    const sourceFields = form.findFields(Array.from(Object.values(config.propertiesSources)))
    const optionsAccessor = new ServiceBankOptionsAccessor(config.type)
    subscribeToFields(sourceFields, () => {
        const properties: typeof config.properties = {...config.properties}
        // Remapping
        Object.entries(config.propertiesSources).forEach(entry =>
            properties[entry[0]] = sourceFields.get(entry[1])
        )
        optionsAccessor
            .fetch(properties)
            .then(options => options ? onFetch(options) : options)
    })
}

function subscribeToFields(fieldsMap: Map<string, Field<any>> | Field<any>[], onChange: () => void){
    fieldsMap.forEach(field =>
        field.onValueChange(() => {
            onChange()
        })
    )
}
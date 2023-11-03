import {Field} from "./Field"
import Select from "../../../inputs/Select"
import {Section} from "../Section"
import {concatMaps, prettify} from "../../../../util/data"
import Form from "../../Form"
import {AbstractServiceBank} from "../../../../api/options/serviceBank/AbstractServiceBank";
import {CarriersServiceBank} from "../../../../api/options/serviceBank/CarriersServiceBank";
import {CountriesServiceBank} from "../../../../api/options/serviceBank/CountriesServiceBank";
import {RegionsServiceBank} from "../../../../api/options/serviceBank/RegionsServiceBank";
import {RoadsServiceBank} from "../../../../api/options/serviceBank/RoadsServiceBank";
import {StationsServiceBank} from "../../../../api/options/serviceBank/StationsServiceBank";

export class SelectField extends Field<OptionKey[]> {

    private static OptionsRetrievingQuery = {}

    protected selectFragment: Select

    options: OptionsMap = new Map()

    private staticOptions: OptionsMap = new Map()
    private serviceBankOptions: OptionsMap = new Map()

    awaitingForServiceBankOptions: boolean = false

    constructor(section: Section, private config: SelectFieldConfig) {
        const select = new Select(config,
            optionKeys => this.triggerValueChange(optionKeys))
        super(section, config, true, [])
        this.append(select)
        this.selectFragment = select
    }

    override triggerValueChange(optionKeys: OptionKey[]) {
        this.selectFragment.modulePromise.then(() => {
            this.selectFragment.pickOptions(optionKeys)
            super.triggerValueChange(this.selectFragment.pickedKeys)
        })
    }

    override get prettyValue(){
        return prettify(this.selectFragment.findOptions(this.value))
    }

    setStaticOptions(options: OptionsMap) {
        this.staticOptions = options
        this.updateOptions()
    }

    setupServiceBank(setup: ServiceBankSetup, initValues: OptionKey[] = []) {
        this.awaitingForServiceBankOptions = true
        setupServiceBankRetrieving(this.parent.parent, setup,
            (options, userAssociatedOptionKeys) => {
                this.serviceBankOptions = options
                this.updateOptions()?.then(() => {
                    if (initValues.length + userAssociatedOptionKeys.length > 0)
                        this.triggerValueChange([...userAssociatedOptionKeys, ...initValues])
                })
                this.awaitingForServiceBankOptions = false
            })
       }

    private updateOptions() {
        this.options = concatMaps(this.staticOptions, this.serviceBankOptions)
        return this.selectFragment.updateOptions(this.options)
    }
}

function setupServiceBankRetrieving(form: Form, config: ServiceBankSetup, onFetch: (options: OptionsMap, userAssociatedOptionKeys: OptionKey[]) => void){
    const sourceFields = config.propertiesTriggerKeys ? form.findFields(Array.from(Object.values(config.propertiesTriggerKeys))) : null
    const optionsAccessor = createServiceBankAccessor(config)
    subscribeToFields(sourceFields, () => {
        const properties: typeof config.properties = {...config.properties}
        // Remapping
        Object.entries(config.propertiesTriggerKeys).forEach(entry => {
            const sourceField = sourceFields?.get(entry[1])
            if (sourceField) {
                const json = sourceField.jsonValue
                properties[entry[0]] = sourceField instanceof SelectField && json !== null ? Object.keys(json) : json
            }
        })
        optionsAccessor
            .fetch(properties)
            .then(options => options ? onFetch(options, optionsAccessor.userAssociatedOptionKeys) : options)
    })
}

function createServiceBankAccessor(config: ServiceBankSetup): AbstractServiceBank {
    const accessor = config.type === "carriers" ? new CarriersServiceBank() :
        config.type === "countries" ? new CountriesServiceBank() :
            config.type === "regions" ? new RegionsServiceBank() :
                config.type === "roads" ? new RoadsServiceBank() :
                    config.type === "stations" ? new StationsServiceBank()
                        : new Error("Cannot resolve ServiceBank type: " + config.type)

    if(accessor instanceof Error)
        throw accessor
    else
        return accessor
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
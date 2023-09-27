import {Field} from "./Field"
import Select from "../../../inputs/Select"
import {Section} from "../Section"
import {concatMaps, prettify} from "../../../../util/data"
import Form from "../../Form"
import {AbstractServiceBank} from "../../../../api/serviceBank/AbstractServiceBank";
import {CarriersServiceBank} from "../../../../api/serviceBank/CarriersServiceBank";
import {CountriesServiceBank} from "../../../../api/serviceBank/CountriesServiceBank";
import {RegionsServiceBank} from "../../../../api/serviceBank/RegionsServiceBank";
import {RoadsServiceBank} from "../../../../api/serviceBank/RoadsServiceBank";
import {StationsServiceBank} from "../../../../api/serviceBank/StationsServiceBank";

export class SelectField extends Field<OptionKey[]> {

    private static OptionsRetrievingQuery = {}

    protected selectFragment: Select

    options: Options = new Map()
    private serviceBankOptions: Options = new Map()

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

    setOptions(options: Options) {
        this.options = options
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
        return this.selectFragment.updateOptions(concatMaps(this.options, this.serviceBankOptions))
    }
}

function setupServiceBankRetrieving(form: Form, config: ServiceBankSetup, onFetch: (options: Options, userAssociatedOptionKeys: OptionKey[]) => void){
    const sourceFields = config.propertiesSources ? form.findFields(Array.from(Object.values(config.propertiesSources))) : null
    const optionsAccessor = createServiceBankAccessor(config)
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
            .then(options => options ? onFetch(options, optionsAccessor.userAssociatedOptionKeys) : options)
    })
}

function createServiceBankAccessor(config: ServiceBankSetup): AbstractServiceBank {
    const accessor = config.type === "carriers" ? new CarriersServiceBank(config.permitAll) :
        config.type === "countries" ? new CountriesServiceBank(config.permitAll) :
            config.type === "regions" ? new RegionsServiceBank(config.permitAll) :
                config.type === "roads" ? new RoadsServiceBank(config.permitAll) :
                    config.type === "stations" ? new StationsServiceBank(config.permitAll)
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
import {Field} from "./Field"
import Select from "../../../inputs/Select"
import {Section} from "../Section"
import {fetchEndpointOptions} from "../../../../util/api/options/endpointOptions"
import {concatMaps} from "../../../../util/data";
import {EndpointOptionsAccessor} from "../../../../api/EndpointOptionsAccessor";

export class SelectField extends Field<Options>{

    protected selectInput: Select

    constructor(section: Section, private config: SelectFieldConfig) {
        const select = new Select(config, options => this.changeValue(options))
        super(section, `<p>${config.label}</p>`, select)
        this.selectInput = select
    }

    startOptionsRetrieving(){
        let endpointOptions: Options,
            serviceBankOptions: Options
        const update=() => this.selectInput.options = concatMaps(endpointOptions, serviceBankOptions)

        this.setupEndpointOptionsRetrieving(options => {endpointOptions = options; update()})
        this.setupServiceBankOptionsRetrieving(options => {serviceBankOptions = options; update()})
    }

    private setupEndpointOptionsRetrieving(onFetch: (options: Options) => void){
        const sourceFieldsMap = this.fieldLocationsToFieldsMap(
            this.config.optionsSources?.endpoint?.propertiesSources)
        const optionsAccessor = new EndpointOptionsAccessor(
            this.config.optionsSources.endpoint.path, sourceFieldsMap, onFetch)

        subscribeToFields(Array.from(sourceFieldsMap.values()), optionsAccessor.fetch)
    }

    private setupServiceBankOptionsRetrieving(onFetch: (options: Options) => void){
        const rawPropertiesSources =
            this.config.optionsSources?.serviceBank?.propertiesSources
        const sourceFieldsMap =
            this.fieldLocationsToFieldsMap(Object.values(rawPropertiesSources))
        const optionsAccessor = new Service

        subscribeToFields(Object.values(propertiesFields), fields => {

        })
    }

    private fieldLocationsToFieldsMap(fieldLocations: string[]): Map<string, Field<any>>{
        const fieldsMap: Map<string, Field<any>> = new Map()
        fieldLocations.forEach(location =>
            fieldsMap.set(location, this.section.form.findField(location))
        )
        return fieldsMap
    }
}

function subscribeToFields(fields: Field<any>[], onChange: () => void){
    fields.forEach(field =>
        field.onValueChange(() => {
            onChange()
        })
    )
}
import {Field} from "../Field"
import Select from "../../../../inputs/Select"
import {Section} from "../../Section"
import {fetchEndpointOptions} from "../../../../../util/api/options/endpointOptions"
import {concatMaps} from "../../../../../util/data";

export class SelectField extends Field<Options>{

    protected selectInput: Select

    constructor(section: Section, private config: SelectFieldConfig) {
        const select = new Select(config, options => this.changeValue(options))
        super(section, `<p>${config.label}</p>`, select)
        this.selectInput = select
    }

    startOptionsRetrieving(){
        let endpointOptions: Options, serviceBankOptions: Options

        const update=() =>
            this.selectInput.options = concatMaps(endpointOptions, serviceBankOptions)

        this.setupEndpointOptionsRetrieving(options => {endpointOptions = options; update()})
        this.setupServiceBankOptionsRetrieving(options => {serviceBankOptions = options; update()})
    }

    private setupEndpointOptionsRetrieving(onFetch: (options: Options) => void){
        this.subscribeToFields(this.config.optionsSources?.endpoint?.properties,
            fields =>
                fetchEndpointOptions(this.config.optionsSources.endpoint.path, fields)
                    .then(options => onFetch(options)))
    }


    private setupServiceBankOptionsRetrieving(onFetch: (options: Options) => void){

    }

    private subscribeToFields(fieldLocations: string[], onValueChange: <T>(fields: Map<string, Field<any>>) => void){
        const triggerFields: Map<string, Field<any>> = new Map()
        fieldLocations.forEach(location =>
            triggerFields.set(location, this.section.form.findField(location))
        )
        triggerFields.forEach((field, location) =>
            field.onValueChange(() => {
                onValueChange(triggerFields)
            })
        )
    }
}
import {Accessor} from "./Accessor"
import {Field} from "../fragments/form/section/field/Field"

// Subscribes to fields from argument and call request each time they changed. Fields values are converted to body properties
export abstract class ReactiveAccessor<RESOURCE> extends Accessor<RESOURCE>{

    protected constructor(private subscribableFieldsMap: Map<FieldKey, Field<any>>,
                          onFetch: (resource: RESOURCE) => void) {

        super(onFetch)
        subscribableFieldsMap.forEach(field =>
            field.onValueChange(() => {
                onChange()
            })
        )
    }
}
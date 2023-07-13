import {Section} from "../Section"
import {updateEvent} from "../../../../entities/events"


export abstract class Field implements Fragment{

    abstract readonly value: any

    protected constructor(public core: HTMLElement,
                          public section: Section){}

    protected dispatchUpdate = () => this.core.dispatchEvent(updateEvent)

    subscribeToFields(keys: Set<Pair<SectionKey, FieldKey>>, onUpdate: (value) => void){
        keys.forEach(pair => this.subscribeToField(pair.first, pair.second, onUpdate))
    }

    subscribeToField(sectionKey: SectionKey, fieldKey: FieldKey, onUpdate: (value) => void){

        const field = this.findFieldOrThrowError(sectionKey, fieldKey)
        field.core.addEventListener(updateEvent.type, () => onUpdate(field.value))
    }

    private findFieldOrThrowError(sectionKey: SectionKey, fieldKey: FieldKey): Field{
        const section = this.section.form.sections.get(sectionKey)
        if(!section) throw Error(`Не удалось найти секцию с ключом "${sectionKey}"`)
        const field = section.fields.get(fieldKey)
        if(!field) throw Error(`Не удалось найти поле с ключом "${sectionKey}.${fieldKey}"`)
        return field
    }
}
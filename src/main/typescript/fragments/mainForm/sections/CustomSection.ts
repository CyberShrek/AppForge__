export class CustomSection implements FormSectionFragment{

    fields: Map<FieldKey, SectionFieldFragment>

    constructor(public core: HTMLElement) {

    }
}
interface Fragments {
    core: HTMLElement
}

interface MainFormFragment extends Fragments{
    sections: Map<SectionKey, FormSectionFragment>
}

interface FormSectionFragment {
    title?: string
    fields: Map<FieldKey, SectionFieldFragment>

}

interface SectionFieldFragment {
    title?: string
    dependsOnSection?: SectionKey
    dependsOnField?: SectionKey
    getValue?: () => any
}

type SectionKey = string
type FieldKey = string
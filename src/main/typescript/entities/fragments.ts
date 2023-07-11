interface Fragment {
    core: HTMLElement
}

interface MainFormFragment extends Fragment{
    sections: Map<SectionKey, FormSectionFragment>
}

interface FormSectionFragment extends Fragment {
    fields: Map<FieldKey, SectionFieldFragment>
}

interface SectionFieldFragment extends Fragment {
    // dependsOnSection?: SectionKey
    // dependsOnField?: SectionKey
    // getValue?: () => any
}

type SectionKey = string
type FieldKey = string
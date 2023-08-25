type FormValues = Map<FieldAddress, string>

interface FieldAddress {
    section: SectionKey,
    field: FieldKey
}
type SectionKey = string
type FieldKey = string
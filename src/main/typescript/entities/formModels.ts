interface FormStatement{
    message?: string
    showFields: string[]
    hideFields: string[]
    wrongFields: string[]
    showSections: string[]
    hideSections: string[]
}

type Fields = {[name: string]: FieldKey}


type FieldKey = string
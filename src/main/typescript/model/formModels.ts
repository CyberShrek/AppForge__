interface FormStatement{
    message?: string
    show?: string[]
    hide?: string[]
    wrong?: string[]
    setValues?: {[fieldName: string]: any}
    setOptions?: {[fieldName: string]: object}
    setupServiceBank?: {[fieldName: string]: ServiceBankSetup}
}

interface ServiceBankSetup {
    type: "carriers" | "countries" | "regions" | "roads" | "stations"
    // Works like Endpoint.propertiesSources but with field locations as values
    propertiesSources: {
        postSoviet?: string,
        date?: string,
        carriers?: string,
        countries?: string,
        roads?: string
    }
    properties?: {
        postSoviet?: boolean,
        date?: string,
        carriers?: string[],
        countries?: string[],
        roads?: string[],
        [custom: string]: any
    }
}

type Fields = {[name: string]: FieldKey}

type FieldKey = string
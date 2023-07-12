import {Field} from "./fields/Field"
import {Form} from "../Form"

export abstract class Section implements Fragment{

    fields: Map<FieldKey, Field> = new Map()

    protected constructor(public core: HTMLElement,
                          public form: Form) {}
}
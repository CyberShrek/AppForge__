import {Field} from "./fields/Field"
import {Form} from "../Form"
import {Fragment} from "../../core/Fragment"

export abstract class Section extends Fragment{

    fields: Map<FieldKey, Field> = new Map()

    protected constructor(core: HTMLElement,
                          public form: Form) {super(core)}
}
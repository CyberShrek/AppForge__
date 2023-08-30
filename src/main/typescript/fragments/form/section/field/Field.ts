import {Fragment} from "../../../Fragment"
import {jsonify} from "../../../../util/data"
import {Section} from "../Section";
import {CheckboxField} from "./CheckboxField";

export abstract class Field<VALUE> extends Fragment<HTMLDivElement>{

    private _value: VALUE

    get value(){
        return this._value
    }
    get jsonValue(){
        return jsonify(this._value)
    }

    makeValid(){
        this.removeClass("wrong")
    }
    makeInvalid(){
        this.addClass("wrong")
    }

    onValueChange(callback: (value?: VALUE) => void) {
        this.onValueChangeCallbacks.push(callback)
    }

    protected constructor(
        readonly section: Section,
        ...content: (string | Element | Fragment)[])
    {
        super(`<div class="field"></div>`)
        this.append(...content)
        section.append(this)
    }

    // Need to be called by implementations on each value change to set actual value and trigger onValueChangeCallbacks
    protected changeValue(newValue: VALUE){
        this._value = newValue
        this.onValueChangeCallbacks.forEach(callback => callback(newValue))
    }

    private onValueChangeCallbacks: ((value?: VALUE) => void)[] = []
}
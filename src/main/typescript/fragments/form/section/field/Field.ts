import {Fragment} from "../../../Fragment"
import {jsonify} from "../../../../util/data"
import {Section} from "../Section"
import {InlineFragment} from "../../../InlineFragment";

export abstract class Field<VALUE> extends InlineFragment<Section>{

    private _value: VALUE

    get value(){
        return this._value
    }

    // Need to be called by implementations on each value change to set actual value and trigger onValueChangeCallbacks
    triggerValueChange(newValue?: VALUE){
        this._value = newValue
        this.onValueChangeCallbacks.forEach(callback => callback(this._value))
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
        readonly parent: Section,
        initValue: VALUE,
        ...content: (string | Element | Fragment)[])
    {
        super(parent, `<div class="field"></div>`)
        this.append(...content)
        this._value = initValue
    }

    private onValueChangeCallbacks: ((value?: VALUE) => void)[] = []
}
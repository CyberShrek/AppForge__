import {Module} from "./Module"
import {compare, deepCopyOf} from "../../util/data"

export abstract class InputModule<VALUE_TYPE> extends Module{

    protected value: VALUE_TYPE

    private readonly onChangeCallbacks: ((newValue: VALUE_TYPE) => void)[] = []

    constructor(private changeRootValueFn?: (value: VALUE_TYPE) => void) {
        super()
    }
    
    onChange = (callback: (newValue: VALUE_TYPE) => void) => this.onChangeCallbacks.push(callback)

    getValue(): VALUE_TYPE{
        return this.value
    }

    setValue(value: VALUE_TYPE, changeRootValue = true){
        if(!compare(value, this.value)){
            this.value = deepCopyOf(value)
            this.onChangeCallbacks.forEach(callback => callback(this.value))
            changeRootValue && this.changeRootValueFn?.(value)
        }
    }
}
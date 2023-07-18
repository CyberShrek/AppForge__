import {Fragment} from "./Fragment"

export abstract class InputFragment<V> extends Fragment{

    private _value: V
    private valueChangeCallbacks: ((value: V) => void)[] = []
    get value(): V {
        return this._value
    }
    protected set value(value: V){
        this._value = value
        this.valueChangeCallbacks.forEach(callback => callback(value))
    }

    protected constructor(protected readonly core: HTMLInputElement,
                          protected readonly location?: FragmentLocation) { super(core, location) }

    subscribe(onValueChange: (value: V) => void){
        this.valueChangeCallbacks.push(onValueChange)
        if(this.value)
            onValueChange(this.value)
    }

    protected debounce(callback: () => void, delay: number = 100): () => void {
        let timeoutId: NodeJS.Timeout;
        return () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(callback, delay)
        }
    }
}
import {Fragment} from "./Fragment"

export abstract class InputFragment<V> extends Fragment{

    private _value: V
    private valueEventCallbacks: ((value?: V) => void)[] = []
    get value(): V {
        return this._value
    }

    protected set value(value: V){
        this._value = value
        this.valueEventCallbacks.forEach(callback => callback(value))
    }

    protected constructor(protected readonly location: FragmentLocation) { super(location) }

    subscribe(onValueEvent: (value: V) => void, runOnInit: boolean = true){
        this.valueEventCallbacks.push(onValueEvent)
        if(runOnInit)
            onValueEvent(this.value)
    }

    protected debounce(callback: () => void, delay: number = 100): () => void {
        let timeoutId: NodeJS.Timeout;
        return () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(callback, delay)
        }
    }
}
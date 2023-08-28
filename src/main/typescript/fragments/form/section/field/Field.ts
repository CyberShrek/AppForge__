import {Fragment, Trigger} from "../../../Fragment"
import {jsonify} from "../../../../util/data"

export abstract class Field<T extends Input> extends Fragment<HTMLDivElement> implements Trigger{

    abstract jsonValue: object
    abstract subscribe(callback: (value?: any) => void)

    protected constructor(config: FieldConfig) {
        super(`<div class="${config.type} field"></div>`)
    }

    makeValid(){
        this.removeClass("wrong")
    }

    makeInvalid(message?: string){
        this.addClass("wrong")
    }
}
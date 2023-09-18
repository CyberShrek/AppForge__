import {Fragment} from "../../../Fragment"
import {jsonify} from "../../../../util/data"
import {Section} from "../Section"
import {InlineFragment} from "../../../InlineFragment";
import {create} from "../../../../util/domWizard";

export abstract class Field<VALUE> extends InlineFragment<Section>{

    value: VALUE

    // Need to be called by implementations on each value change to set actual value and trigger onValueChangeCallbacks
    triggerValueChange(newValue?: VALUE){
        this.value = newValue
        this.onValueChangeCallbacks.forEach(callback => callback(this.value))
    }

    get jsonValue(){
        return jsonify(this.value)
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
        config: CommonFieldConfig,
        createParagraph: boolean,
        initValue: VALUE,
        ...content: (string | Element | Fragment)[])
    {
        super(parent, `<div class="field" style="grid-column: span ${config.size ? config.size : 1}"></div>`)

        if(createParagraph && config.label)
            this.append(create(`<p>${config.label}</p>`))

        this.append(...content)
        this.value = initValue
    }

    private onValueChangeCallbacks: ((value?: VALUE) => void)[] = []
}
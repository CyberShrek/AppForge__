import {Fragment} from "../../../Fragment"
import {jsonify, prettify} from "../../../../util/data"
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

    get prettyValue(){
        return prettify(this.value)
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
        super(parent, `<div class="${config.type}-field field" ${config.size ? `style="grid-column: span ${config.size}` : ''}"></div>`)

        if(createParagraph && config.label)
            this.append(create(`<p>${config.label}</p>`))

        this.append(...content)
        this.value = initValue
    }
    private onValueChangeCallbacks: ((value?: VALUE) => void)[] = []
}
import {InlineFragment} from "../../InlineFragment"
import {Body} from "../Body"

export class Context extends InlineFragment<Body>{

    visibleValues: string[]

    constructor(body: Body, context: ContextFields) {
        super(body, `<ul class="context"></ul>`)
        this.visibleValues = Object.entries(context)
            .map(([label, fieldKey]) =>
                label + ": " + body.parent.associatedFormSnapshot.prettyFieldValues.get(fieldKey))

        this.root.innerHTML = this.visibleValues.map(contextString => `<li>${contextString}</li>`).join("")
    }
}
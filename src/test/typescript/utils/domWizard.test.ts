import {createHtml} from "../../../main/typescript/utils/domWizard"
import {mapOf, pairOf} from "../../../main/typescript/utils/misc";

test("testing createHtml() function", async () => {
    expect(
        createHtml({
            tag: "div"
        })
    ).toBe("<div></div>")

    expect(
        createHtml({
            tag: "div",
            id: "element-id",
            class: "element"
        })
    ).toBe(`<div id="element-id" class="element"></div>`)

    expect(
        createHtml({
            tag: "div",
            content: [
                "text",
                {
                    tag: "button",
                    class: "simple button"
                },
                "text2",
                {
                    tag: "button",
                    class: "imaged button",
                    content:[
                        "the button",
                        {
                            tag: "img",
                            attributes:mapOf(
                                pairOf("src", "image.svg")
                            )
                        }
                    ]
                }
            ]
        })
    ).toBe(`<div></div>`)
    }
)// @ts-ignore
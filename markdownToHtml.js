import { Remarkable } from 'remarkable'
import hljs from 'highlight.js'
import {JSDOM} from "jsdom"
import pretty from 'pretty'

import * as fs from "fs"

const converter = new Remarkable({
    html: true,
    highlight: function (str, lang) {
        return hljs.highlightAuto(str).value
    }
})

insertMdIntoHtml("manual.md", "./src/main/resources/static/index.html")

function insertMdIntoHtml(mdName, htmlName){
    fs.readFile(htmlName, "utf-8", (_, html) => {
        fs.readFile(mdName, "utf-8", (_, markdown) => {
            const dom = new JSDOM(html)
            dom.window.document.querySelector("div.markdown-body").innerHTML = converter.render(markdown)
            fs.writeFileSync(htmlName, pretty(dom.serialize()))
        })
    })
}


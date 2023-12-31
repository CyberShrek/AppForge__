
import {BlobAccessor} from "./abstract/BlobAccessor"

export class XlsxAccessor extends BlobAccessor {

    override path = "appforge/converter/xlsx"
    override method: "POST" = "POST"
    override errorFooter = "Ошибка экспорта таблицы"

    constructor(override body: XlsxTableModel) {
        super()
    }

    override fetch(){
        return super.fetch().then(blob => {
            const aElement = document.createElement('a')
            aElement.setAttribute('download', this.body.title + ".xlsx")
            const href = URL.createObjectURL(blob)
            aElement.href = href
            aElement.setAttribute('target', '_blank')
            aElement.click()
            URL.revokeObjectURL(href)
            return blob
        })
    }
}
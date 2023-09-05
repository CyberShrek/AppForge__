
import {BlobAccessor} from "./abstract/BlobAccessor"

export class XlsxAccessor extends BlobAccessor {

    override path = "appforge/converter/xlsx"
    override method: "POST" = "POST"
    override errorMessage = "Ошибка экспорта таблицы"

    override fetch(tableModel: XlsxTableModel){
        this.body = tableModel
        return super.fetch().then(blob => {
            const aElement = document.createElement('a')
            aElement.setAttribute('download', this.body.name + ".xlsx")
            const href = URL.createObjectURL(blob)
            aElement.href = href
            aElement.setAttribute('target', '_blank')
            aElement.click()
            URL.revokeObjectURL(href)
            return blob
        })
    }
}
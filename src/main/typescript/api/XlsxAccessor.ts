import {Accessor} from "./Accessor";

export class XlsxAccessor extends Accessor<void> {

    override path = "appforge/converter/xlsx"
    override method: "POST" = "POST"
    override body: XlsxTableModel
    override errorMessage = "Ошибка экспорта"

    override get request(){
        return this
            .requestInit
            .blob(blob => {
                const aElement = document.createElement('a')
                aElement.setAttribute('download', this.body.name + ".xlsx")
                const href = URL.createObjectURL(blob)
                aElement.href = href
                aElement.setAttribute('target', '_blank')
                aElement.click()
                URL.revokeObjectURL(href)
            })
    }
}
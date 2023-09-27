import {JsonAccessor} from "./abstract/JsonAccessor"

export class Report extends JsonAccessor<ReportModel>{

    constructor(override path: string) {
        super()
        this.method = "POST"
        this.errorFooter = "Не удалось загрузить отчёт"
    }
}
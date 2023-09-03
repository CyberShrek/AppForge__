import {Accessor} from "./Accessor"

export class ReportAccessor extends Accessor<ReportModel>{

    constructor(override path: string) {
        super()
        this.method = "POST"
        this.errorMessage = "Не удалось загрузить отчёт"
    }
}
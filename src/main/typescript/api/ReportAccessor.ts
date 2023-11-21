import {JsonAccessor} from "./abstract/JsonAccessor"
import {userInfo} from "../store/userInfo";

export class ReportAccessor extends JsonAccessor<ReportModel>{

    constructor(override path: string) {
        super()
        this.method = "POST"
        this.errorFooter = "Не удалось загрузить отчёт"
    }

    override fetch(body: any): Promise<ReportModel> {
        return super.fetch({...body, userInfo})
    }
}
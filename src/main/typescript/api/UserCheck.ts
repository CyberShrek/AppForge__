import {JsonAccessor} from "./abstract/JsonAccessor"
import {appConfig} from "../store/appConfig"

export class UserCheck extends JsonAccessor<UserInfo>{
    path = "/appforge/ucheck"
    override errorFooter = "Не удалось пройти проверку"

    constructor() {
        super()
        this.params = {code: appConfig.code}
    }
}
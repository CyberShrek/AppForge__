import {UserCheck} from "../api/UserCheck"
export let userInfo: UserInfo = {} as UserInfo
export async function retrieveUserInfo(): Promise<UserInfo> {
    return userInfo = await new UserCheck().fetch()
}



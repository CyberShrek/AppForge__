// @ts-ignore config variable is placed in the html file
export let appConfig: AppConfig = window.config ? config : {}

export function setAppConfig(config: AppConfig){
    appConfig = config
}
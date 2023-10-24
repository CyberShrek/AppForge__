<script lang="ts">
    import {resolveCSS} from "../../util/resolver"
    import Button from "../input/Button.svelte"
    import {popupAction, popupList} from "../../util/modal"
    import {valueOrDefault} from "../../util/data"
    import Image from "../misc/Image.svelte";
    resolveCSS("header")

    export let appInfo: AppInfo

    function showAppInfo(){
        popupList(
            "Информация",
            [
                {icon: "🛈", text: "Версия программы: " + appInfo.version},
                {icon: "🗓", text: "Дата обновления: "  + appInfo.updateDate},
                {icon: "👤", text: "Технолог: "        + appInfo.technologistName}
            ],
            appInfo.additional
        )
    }

    function showHelpDownloader(){
        popupAction(
            "Руководство",
            valueOrDefault(appInfo.description, ""),
            "Скачать инструкцию",
            () => downloadUserManual(appInfo.helpPath)
        )
    }

    function downloadUserManual(href: string){
        const link = document.createElement('a')
        link.href = href
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

</script>

<header id="header">
    <a href="{appInfo.groupPath}">{appInfo.groupName}</a>|<p>{appInfo.name}</p>

    <Button hint="Сброс"                    frameless on:click={() => location.reload()}><Image name="reset.svg"/></Button>
    <Button hint="Информация о приложении"  frameless on:click={showAppInfo}            ><Image name="info.svg"/></Button>
    <Button hint="Руководство пользователя" frameless on:click={showHelpDownloader}     ><Image name="help.svg"/></Button>
</header>
<script lang="ts">
    import {resolveStyle} from "../../util/resolver"
    import Button from "../input/Button.svelte"
    import {popupAction, popupList} from "../../util/modal"
    import {valueOrDefault} from "../../util/data"
    import Image from "../misc/Image.svelte";
    resolveStyle("header")

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

    <Button hint="Сброс"                    frameless image="reset.svg" on:click={() => location.reload()}/>
    <Button hint="Информация о приложении"  frameless image="info.svg"  on:click={showAppInfo}/>
    <Button hint="Руководство пользователя" frameless image="help.svg"  on:click={showHelpDownloader}/>
</header>
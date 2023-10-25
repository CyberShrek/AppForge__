import A from "../../../main/typescript/components/Application.svelte"

const app = new A({
    target: document.body,
    props: {
        appInfo: {
            name: "Debug"
        }
    }
});

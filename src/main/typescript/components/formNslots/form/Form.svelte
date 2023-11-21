<script lang="ts">
    import {resolveStyle} from "../../../util/resolver"
    import {compare, deepCopyOf, extractJsonItemsWithSuffix, parseFormStatementKeys, prettify} from "../../../util/data"
    import Section from "./section/Section.svelte"
    import Button from "../../input/Button.svelte"
    import {FormStateAccessor} from "../../../api/FormStateAccessor"
    import {ReportAccessor} from "../../../api/ReportAccessor"
    import {createEventDispatcher} from "svelte"

    resolveStyle("form")

    const dispatch = createEventDispatcher()

    export let config: FormConfig

    const reportAccessor = new ReportAccessor(config.submitPath)

    let sectionConfigsObject = config ? extractJsonItemsWithSuffix(config, "Section") as {[sectionKey: string]: FormSectionConfig} : {},
        jsonValues = {},
        valueScope: FormValues,
        submittedValues: FormValues,
        wrongSections: SectionKeys,
        hiddenSections: SectionKeys,
        wrongSectionFields: SectionFieldKeys,
        hiddenSectionFields: SectionFieldKeys,
        previousState: FormState,
        submitIsUnavailable: boolean = true,
        showWrongs = false

    $: stateAccessor = config?.statePath ? new FormStateAccessor(config.statePath) : null

    $: if(Object.keys(jsonValues).length > 0)
        onValuesChange()

    $: if(submittedValues)
        dispatchNewReport()


    function onValuesChange(){
        valueScope = {}
        submitIsUnavailable = true
        for (const sectionKey in jsonValues) {
            if(!hiddenSections?.has(sectionKey)) {
                const fieldValues = jsonValues[sectionKey]
                for (const fieldKey in fieldValues)
                    if(!hiddenSectionFields?.get(sectionKey)?.has(fieldKey))
                        valueScope[`${sectionKey}.${fieldKey}`] = fieldValues[fieldKey]
            }
        }
        stateAccessor?.fetch(valueScope)
            .then(state => manageStatement(state))
    }

    function manageStatement(state: FormState){
        wrongSections       = new Set()
        wrongSectionFields  = new Map()
        hiddenSections      = new Set()
        hiddenSectionFields = new Map()

        if(!state) return

        if(state.wrong)
            parseFormStatementKeys(state.wrong, wrongSections, wrongSectionFields)
        else
            submitIsUnavailable = false

        if(state.hidden && !compare(state.hidden, previousState?.hidden)) {
            parseFormStatementKeys(state.hidden, hiddenSections, hiddenSectionFields)
            onValuesChange()
        }
        previousState = deepCopyOf(state)
    }

    async function dispatchNewReport(){
        const reportModel = await reportAccessor.fetch(submittedValues)
        reportModel.usedValues = deepCopyOf(submittedValues)
        dispatch("report", reportModel)
    }

</script>

<form>

    {#each Object.keys(sectionConfigsObject) as sectionKey}
        <Section config={sectionConfigsObject[sectionKey]}
                 bind:values={jsonValues[sectionKey]}
                 {valueScope}
                 wrong={showWrongs && wrongSections?.has(sectionKey)}
                 hidden={hiddenSections?.has(sectionKey)}
                 wrongFields={showWrongs ? wrongSectionFields?.get(sectionKey) : null}
                 hiddenFields={hiddenSectionFields?.get(sectionKey)}/>
    {/each}

    <Button submit text={config.submitText}
            unavailable={showWrongs && submitIsUnavailable}
            on:click={() => submittedValues = valueScope}
            on:mouseenter={() => showWrongs = true}
    />
</form>
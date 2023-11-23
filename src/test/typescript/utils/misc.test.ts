import {
    concatMaps,
    javaMapToMap,
    mapOf,
    pairOf,
    parseFormStatementKeys,
    setOf
} from "../../../main/typescript/util/data"

test("test pairOf", () => expect(
    pairOf("first", "second")
).toEqual(
    {"first":"first", "second":"second"}
))

test("test pairOf", () => expect(
    mapOf(pairOf("a", "qwerty"), pairOf("b", "a w e"), pairOf("123", "123"))
).toEqual(
    new Map([["a", "qwerty"], ["b", "a w e"], ["123", "123"]])
))

test("test javaMapToMap", () => expect(
    javaMapToMap("{a=qwerty, b=a w e, 123=123}")
).toEqual(
    mapOf(pairOf("a", "qwerty"), pairOf("b", "a w e"), pairOf("123", "123"))
))

test("test concatMaps", () => expect(
    concatMaps(
        mapOf(pairOf("a", "qwerty"), pairOf("b", "a w e")),
        mapOf(pairOf("c", "dd"), pairOf("c", "eeee")))
).toEqual(
    mapOf(pairOf("a", "qwerty"), pairOf("b", "a w e"), pairOf("c", "dd"), pairOf("c", "eeee"))
))

test("test parseFormStatementKeys", () => {
    let sectionsReceiver: Set<string> = new Set(),
        sectionFieldsReceiver: Map<string, Set<string>> = new Map()

    // 1
    parseFormStatementKeys(
        ["firstSection_firstField", "secondSection_secondField", "thirdSection_thirdField"],
        sectionsReceiver,
        sectionFieldsReceiver
    )
    expect(sectionsReceiver).toEqual(setOf())
    expect(sectionFieldsReceiver).toEqual(mapOf(
        pairOf("firstSection", setOf("firstField")),
        pairOf("secondSection", setOf("secondField")),
        pairOf("thirdSection", setOf("thirdField"))
        ))

    // 2
    sectionsReceiver = new Set()
    sectionFieldsReceiver = new Map()
    parseFormStatementKeys(
        ["firstSection_firstField", "firstSection_secondField", "firstSection_thirdField"],
        sectionsReceiver,
        sectionFieldsReceiver
    )
    expect(sectionsReceiver).toEqual(setOf())
    expect(sectionFieldsReceiver).toEqual(mapOf(
        pairOf("firstSection", setOf("firstField", "secondField", "thirdField"))
    ))

    // 3
    sectionsReceiver = new Set()
    sectionFieldsReceiver = new Map()
    parseFormStatementKeys(
        ["zeroSection", "firstSection_firstField", "firstSection_secondField", "firstSection_thirdField", "secondSection_firstField", "secondSection_thirdField", "thirdSection"],
        sectionsReceiver,
        sectionFieldsReceiver
    )
    expect(sectionsReceiver).toEqual(setOf("zeroSection", "thirdSection"))
    expect(sectionFieldsReceiver).toEqual(mapOf(
        pairOf("firstSection", setOf("firstField", "secondField", "thirdField")),
        pairOf("secondSection", setOf("firstField", "thirdField"))
    ))
})
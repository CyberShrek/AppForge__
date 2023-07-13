import {concatMaps, javaMapToMap, mapOf, pairOf} from "../../../main/typescript/utils/misc"

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
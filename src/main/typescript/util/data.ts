// Returns vararg items as a Set of the vararg items
import {Field} from "../fragments/mainForm/section/field/Field"

export function setOf<T>(...items: T[]): Set<T>{
    return new Set(items)
}

// Returns a Map of the vararg Pair entries
export function mapOf<K, V>(...entries: Pair<K, V>[]): Map<K, V>{
    return new Map(entries.map(entry => [entry.first, entry.second]))
}

// Returns two arguments as a Pair object
export function pairOf<F, S>(first: F, second: S): Pair<F, S>{
    return {first, second}
}

// Returns a basic number from gotten string if this is possible, or 0 if not
export function numberOf(word: string|number): number {
    return isNaN(Number(word)) ? 0 : Number(word)
}

// Returns a Map consisting of the vararg Maps
export function concatMaps(...maps: Map<any, any>[]): Map<any, any>{
    const buffer = []
    maps.forEach(map => buffer.push(...map.entries()))
    return new Map(buffer)
}

// Returns sorted by key Map
export function sortMap<K, V>(contentMap: Map<K, V>): Map<K, V>{
    return new Map([...contentMap.entries()].sort(
        (a : [K, V], b : [K, V]) : number => a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0
    ))
}

export function filterMap<K, V>(map: Map<K, V>, filter: (value: V, key: K) => boolean): Map<K, V> {
    return new Map(Array.from(map).filter(([key, value]) => filter(value, key)))
}

export function mapToJson<V>(map: Map<string, V>): {[k: string]: V} {
    const obj: {[k: string]: V} = {}
    map.forEach((value, key) => obj[key] = value)
    return obj
}

export function jsonToMap<V>(json: object): Map<string, V> {
    const map: Map<string, V> = new Map()
    for (const key in json) {
        map.set(key, json[key])
    }
    return map
}

export function compareMaps<K, V>(map1: Map<K, V>|null, map2: Map<K, V>|null): boolean {
    if(map1 === null || map2 === null)
        return map1 === map2

    if (map1.size !== map2.size)
        return false

    for (const [key, value] of map1) {
        if (!map2.has(key))
            return false
        if (map2.get(key) !== value)
            return false
    }

    return true
}

export function setToArray<T>(set: Set<T>): T[] {
    return [...set]
}

export function stringify<T>(value: T): string{
    if(value === null || value === undefined)
        return ""
    if(typeof value !== "object")
        return String(value)
    if(value instanceof Set || value instanceof Array)
        return Array.from(value).join(", ")
    if(value instanceof Map)
        return [...value.entries()].map(([key, value]) => `${value}(${key})`).join(", ")
    if (value instanceof Date)
        return stringifyDate(value)

    return stringify(jsonToMap(value))
}

export function jsonify<T>(value: T|null):  any{
    if(value === null || value === undefined)
        return null
    if(typeof value !== "object")
        return value
    if(value instanceof Set)
        return setToArray(value)
    if(value instanceof Map)
        return mapToJson(value)

    return value
}

export function jsonifyFields(fields: Map<FieldKey, Field<any>>): JsonFieldValues{
    const json: { [key: string]: object } = {}
    fields.forEach((field, key) => {
        json[key] = field.jsonValue
    })
    return json
}

export function stringifyDate(date: Date): string {
    const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate()
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
}

export function javaSetToSet(javaSet: string): Set<string>{
    return setOf(...splitJavaCollection(javaSet))
}

export function javaMapToMap(javaMap: string): Map<string, string>{
    return mapOf(
        ...splitJavaCollection(javaMap)
        .map(pair => {
            const entry = pair.split("=")
            return pairOf(entry[0], entry[1])
        })
    )
}

export function splitJavaCollection(javaCollection: string): string[]{
    return javaCollection
        .slice(1, -1) // Removing '{' and '}' in the both sides of the string
        .split(", ")
}

export function transposeMatrix<T>(matrix: T[][]): T[][]{
    return matrix[0].map((_, i) => matrix.map(row => row[i]))
}

export const nullOrUndefined = (value: any): boolean => value === null || value === undefined

export const valueOrDefault = <T>(value: T | any, defaultValue: T): T =>
    nullOrUndefined(value) ? defaultValue : value

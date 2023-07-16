export function setOf<T>(...items: T[]): Set<T>{
    return new Set(items)
}

export function mapOf<K, V>(...pairs: Pair<K, V>[]): Map<K, V>{
    return new Map(pairs.map(pair => [pair.first, pair.second]))
}

export function pairOf<F, S>(first: F, second: S): Pair<F, S>{
    return {first, second}
}

export function numberOf(word: string): number {
    return isNaN(Number(word)) ? 0 : Number(word)
}

export function concatMaps(...maps: Map<any, any>[]): Map<any, any>{
    const buffer = []
    maps.forEach(map => buffer.push(...map.entries()))
    return new Map(buffer)
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

export function sortMap<K, V>(contentMap: Map<K, V>): Map<K, V>{
    return new Map([...contentMap.entries()].sort(
        (a : [K, V], b : [K, V]) : number => a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0
    ))
}

export function splitJavaCollection(javaCollection: string): string[]{
    return javaCollection
        .slice(1, -1) // Removing '{' and '}' in the both sides of the string
        .split(", ")
}

export function mapToOptions(map: Map<string, string>): Option[]{
    return [...map.entries()].map(entry => entryToOption(entry))
}

export function jsonToOptions(json: object): Option[]{
    return Object.entries(json).map(entry => entryToOption(entry))
}

export function entryToOption(entry: [string, string]): Option  {
   return  {
       label: entry[1],
       value: entry[0],
       alias: entry[0],
       description: entry[0]
    }
}

export function optionsToMap(options: Option[]): Map<string, string>{
    const map: Map<string, string> = new Map()
    options.forEach(option => map.set(option.value, option.label))
    return map
}

export function setCursorToLoading() {
    document.documentElement.style.cursor = 'wait'
}

export function setCursorToDefault() {
    document.documentElement.style.cursor = 'default'
}
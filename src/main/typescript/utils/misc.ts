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

export function javaMapToMap(javaMap: string): Map<string, string>{
    return mapOf(
        ...javaMap
        .slice(1, -1) // Removing '{' and '}' in the both sides of the string
        .split(", ")
        .map(pair => {
            const entry = pair.split("=")
            return pairOf(entry[0], entry[1])
        })
    )
}

export function mapToOptions(map: Map<string, string>, showKeys: boolean = false): Option[]{
    return [...map.entries()].map(entry => {
        return {
            label: entry[1],
            value: entry[0],
            alias: entry[0],
            description: showKeys === true ? entry[0] : null
        }
    })
}

export function optionsToMap(options: Option[]): Map<string, string>{
    const map: Map<string, string> = new Map()
    options.forEach(option => map.set(option.value, option.label))
    return map
}
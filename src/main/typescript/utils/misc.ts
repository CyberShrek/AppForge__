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

export function mapToArray(map: Map<string, string>, includeKeys: boolean = false): string[]{
    return [...map.entries()].map(entry => entry[1])
}
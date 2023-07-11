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

export function formatDate(date: Date): string {
    const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate()
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
}
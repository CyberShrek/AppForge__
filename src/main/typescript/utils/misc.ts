export function setOf<T>(...items: T[]): Set<T>{
    return new Set(items)
}

export function mapOf<K, V>(...pairs: Pair<K, V>[]): Map<K, V>{
    return new Map(pairs.map(pair => [pair.first, pair.second]))
}

export function pairOf<F, S>(first: F, second: S): Pair<F, S>{
    return {first, second}
}
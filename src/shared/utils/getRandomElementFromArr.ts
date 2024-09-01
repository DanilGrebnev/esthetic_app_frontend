export function getRandomElementFromArray<T>(arr: readonly T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

export function getRandomElementFromArray(arr: string[]) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

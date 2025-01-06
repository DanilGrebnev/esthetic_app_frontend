export const getFromLocalStorage = <T extends any = any>(
    key: string,
): T | null => {
    const data = localStorage.getItem(key)
    if (data) return JSON.parse(data)
    return null
}

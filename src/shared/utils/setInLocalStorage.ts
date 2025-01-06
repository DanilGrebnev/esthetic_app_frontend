export const setInLocalStorage = (key: string, value: any) => {
    if (window === undefined) {
        throw new Error('in server component do not work with local storage')
    }
    window.localStorage.setItem(key, JSON.stringify(value))
}

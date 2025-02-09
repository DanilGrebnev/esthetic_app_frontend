type TCallback = (...args: any[]) => any

type Throttle = <T extends TCallback>(
    callback: T,
    timeout: number,
) => (...args: Parameters<T>) => void

export const throttle: Throttle = (cb, timeout) => {
    let timer: any = null

    return (...args) => {
        if (timer) return

        timer = setTimeout(() => {
            cb(...args)
            timer = null
        }, timeout)
    }
}

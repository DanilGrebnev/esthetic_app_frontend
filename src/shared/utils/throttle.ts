type TCb = (...args: any) => any
export const throttle = <T extends TCb>(cb: T, timeout: number) => {
    let timer: any = null

    return (...args: Parameters<T>) => {
        if (timer) return
        
        timer = setTimeout(() => {
            cb(...args)
            timer = null
        }, timeout)
    }
}

/* Stop propagation and prevent default */
export const stopPropAndPrevDef = <T extends (...args: any[]) => any>(
    cb: T,
) => {
    return function <
        E extends { preventDefault: () => void; stopPropagation: () => void },
    >(e: E) {
        e?.preventDefault()
        e?.stopPropagation()
        return cb(e)
    }
}

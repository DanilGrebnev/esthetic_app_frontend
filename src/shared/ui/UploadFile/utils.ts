/*
 * Принимает функцию, и возвращает другую функцию с вызванными
 *  e.stopPropagation() и e.preventDefault()
 */
export const stopEventPropAndPrevDef = <Cb extends (...args: any) => any>(
    cb: Cb,
) => {
    if (typeof cb !== 'function') throw Error('Arguments must be a function')

    return (...args: Parameters<typeof cb>): ReturnType<typeof cb> => {
        args[0]?.preventDefault()
        args[0]?.stopPropagation()
        return cb(...args)
    }
}

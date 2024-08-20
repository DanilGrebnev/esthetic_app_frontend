import { type ForwardedRef, useCallback } from 'react'

export const useCombinedRef = <T extends any>(...refs: ForwardedRef<T>[]) => {
    return useCallback(
        (element: T) => {
            refs.forEach((ref) => {
                if (!ref) return
                if (typeof ref === 'function') {
                    ref(element)
                } else {
                    ref.current = element
                }
            })
        },
        [refs],
    )
}

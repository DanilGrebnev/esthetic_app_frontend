import { Ref, RefObject } from 'react'

export const useCombinedRef = <T extends any>(
    ...refs: ((Ref<T | null> | undefined) | (RefObject<T | null> | undefined))[]
) => {
    return (element: T) => {
        refs.forEach((ref) => {
            if (!ref) return
            if (typeof ref === 'function') {
                ref(element)
            } else {
                ref.current = element
            }
        })
    }
}

import { Ref, RefObject } from 'react'

export const useCombinedRef = <T extends HTMLElement = HTMLElement>(
    ...refs: ((Ref<T> | undefined) | (RefObject<T> | undefined))[]
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

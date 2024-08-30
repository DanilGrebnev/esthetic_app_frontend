/* Хук для установки фокуса на инпут */
import { useRef } from 'react'

export const useFocusOnInput = () => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const focusOnInput = () => {
        if (!inputRef.current) return
        inputRef.current.focus()
    }

    return { focusOnInput, inputRef }
}

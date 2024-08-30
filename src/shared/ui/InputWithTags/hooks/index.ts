/* Установка value в скрытый input */
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { Tag } from '../types'

export const useSetValueInHiddenInput = (tags: Tag[]) => {
    const hiddenInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!hiddenInputRef.current) return
        hiddenInputRef.current.value = JSON.stringify(tags)
    }, [tags])

    return { hiddenInputRef }
}

/* Устанавливает value для компонента InputWithTags */
export const useSetValue = (
    setTags: Dispatch<SetStateAction<Tag[]>>,
    value?: Tag[],
) => {
    useEffect(() => {
        if (!value) return
        setTags(value)
    }, [value, setTags])
}

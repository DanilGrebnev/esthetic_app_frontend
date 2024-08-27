import { Dispatch, SetStateAction, useEffect } from 'react'

import { Tags } from './types'

/* Устанавливает value для компонента InputWithTags */
export const useSetValue = (
    setTags: Dispatch<SetStateAction<Tags[]>>,
    value?: Tags[],
) => {
    useEffect(() => {
        if (!value) return
        setTags(value)
    }, [value, setTags])
}

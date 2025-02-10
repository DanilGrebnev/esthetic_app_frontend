import { useCallback, useEffect, useState } from 'react'

import { type TDefaultTagsValue, Tag } from '../types'

interface TUseSetDefaultTags {
    defaultValue?: TDefaultTagsValue
}
export const useTagsState = (args: TUseSetDefaultTags) => {
    const { defaultValue } = args
    const [tags, setTags] = useState<Tag[]>([])

    const memoizedSetTags = useCallback(setTags, [setTags])

    useEffect(() => {
        if (defaultValue) {
            setTags(defaultValue)
        }
    }, [defaultValue])

    return [tags, memoizedSetTags] as const
}

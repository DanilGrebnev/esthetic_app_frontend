import { Tag } from '@/shared/ui/InputWithTags/types'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { TRecommendedTag } from './types'
import { findTag, transformTag } from './utils'

export const useRecommendedTags = (initialTags: TRecommendedTag[] = []) => {
    const [recommendedTags, setRecommendedTags] = useState<
        TRecommendedTag[] | []
    >(initialTags || [])

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (!inputRef.current) return
        const tags = JSON.parse(inputRef.current.value || '[]') as Tag[]

        recommendedTags.forEach((recTag) => {
            if (!inputRef.current) return
            if (recTag.isChecked && !findTag(tags, { label: recTag.label })) {
                tags.push(transformTag(recTag))
                inputRef.current.value = JSON.stringify(tags)
                return
            }
            if (!recTag.isChecked && findTag(tags, { label: recTag.label })) {
                inputRef.current.value = JSON.stringify(
                    tags.filter((tag) => tag.label !== recTag.label),
                )
            }
        })
    }, [recommendedTags])

    const toggleRecommendedTag = useCallback((tagId: string) => {
        setRecommendedTags((p) =>
            p.map((tag) => {
                if (tag.tagId === tagId) {
                    tag.isChecked = !tag.isChecked
                }
                return tag
            }),
        )
    }, [])

    return {
        recommendedTags,
        toggleRecommendedTag,
        setRecommendedTags,
        inputRef,
    }
}

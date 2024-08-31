import { useLatest } from '@/shared/hooks/useLatest'
import { createTag, isValidLabel } from '@/shared/ui/InputWithTags/utils'
import {
    type ChangeEvent,
    Dispatch,
    type KeyboardEvent,
    SetStateAction,
    useCallback,
    useState,
} from 'react'

import type { TOnChange, Tag } from '../types'

type TUseTagsInput = {
    setTags: Dispatch<SetStateAction<Tag[]>>
    onChange?: TOnChange
    tags: Tag[]
}

export const useTagsInput = ({ setTags, onChange, tags }: TUseTagsInput) => {
    const [label, setLabel] = useState<string>('')
    const latestLabel = useLatest(label)

    const onChangeTags = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value } = target
        if (value.length >= 20) return
        setLabel(value)
    }

    /* Очистка поля ввода */
    const clearLabel = () => {
        setLabel('')
    }

    /* Функция добавления тега  */
    const addTag: () => void = useCallback(() => {
        if (!isValidLabel(latestLabel.current)) return
        const createdTag = createTag(latestLabel.current)
        if (
            tags.find(
                (tag) =>
                    tag.label.toLowerCase() === createdTag.label.toLowerCase(),
            )
        ) {
            return
        }

        setTags((tags) => [...tags, createdTag])
        onChange?.([...tags, createdTag])

        clearLabel()
    }, [latestLabel, setTags, onChange, tags])

    const addTagByEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addTag()
        }
    }
    return {
        onChangeTags,
        clearLabel,
        addTagByEnterKey,
        addTag,
        label,
    }
}

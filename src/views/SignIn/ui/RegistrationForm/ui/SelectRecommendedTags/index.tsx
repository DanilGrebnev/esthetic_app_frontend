import { InputWithTags } from '@/shared/ui/InputWithTags/ui'
import { RecommendedTagIcon } from '@/shared/ui/RecommendedTagIcon'
import { useCallback, useState } from 'react'

import s from './SelectRecommendedTags.module.scss'
import { recommendedTagsInitState } from './recommendedTagsData'
import { type TRecommendedTag } from './types'

export const SelectRecommendedTags = () => {
    const [recommendedTags, setRecommendedTags] = useState<
        TRecommendedTag[] | []
    >(recommendedTagsInitState)

    const onSelectRecommendedTag = (tagId: string) => {
        setRecommendedTags((prev) =>
            prev.map((tag) => {
                if (tag.tagId === tagId) {
                    tag.isChecked = !tag.isChecked
                }
                return tag
            }),
        )
    }

    const onDeleteTag = useCallback((tagId: string) => {
        setRecommendedTags((prev) =>
            prev.map((tag) => {
                if (tag.tagId === tagId) {
                    tag.isChecked = !tag.isChecked
                }
                return tag
            }),
        )
    }, [])

    return (
        <div>
            <div className={s['recommended-tag-list']}>
                {recommendedTags.map((tag) => {
                    return (
                        <RecommendedTagIcon
                            key={tag.tagId}
                            icon={tag.icon}
                            checked={tag.isChecked}
                            onClick={() => onSelectRecommendedTag(tag.tagId)}
                        >
                            {tag.label}
                        </RecommendedTagIcon>
                    )
                })}
            </div>
            <InputWithTags
                onClick={onDeleteTag}
                value={recommendedTags.filter((tag) => tag.isChecked)}
            />
        </div>
    )
}

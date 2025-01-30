import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { forwardRef } from 'react'

import { useRecommendedTags } from '../model/hooks'
import type { TRecommendedTags } from '../model/types'
import { RecommendedTagIcon } from './RecommendedTagIcon'
import s from './RecommendedTags.module.scss'

export const RecommendedTags = forwardRef<HTMLInputElement, TRecommendedTags>(
    (props, ref) => {
        const { initialTags, name } = props

        const { recommendedTags, inputRef, toggleRecommendedTag } =
            useRecommendedTags(initialTags)

        const combinedRef = useCombinedRef<HTMLInputElement>(inputRef, ref)

        return (
            <div className={s['recommended-tag-list']}>
                <input
                    hidden
                    name={name}
                    ref={combinedRef}
                />
                {recommendedTags.map((tag) => {
                    return (
                        <RecommendedTagIcon
                            key={tag.tagId}
                            tagId={tag.tagId}
                            icon={tag.icon}
                            checked={tag.isChecked}
                            onClick={toggleRecommendedTag}
                        >
                            {tag.label}
                        </RecommendedTagIcon>
                    )
                })}
            </div>
        )
    },
)

RecommendedTags.displayName = 'RecommendedTags'

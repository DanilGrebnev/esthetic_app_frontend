'use client'

import {
    useClearAnswerInfoSelector,
    useGetAnswerInfoSelector,
    useSetAnswerCommentNameSelector,
} from '@/features/commentaries/model/store/commentsStore'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { type CSSProperties, memo, useEffect, useState } from 'react'

import { CommentariesWriteField } from '../../WriteCommentSection'
import { CommentControl } from './CommentControl'
import { CommentText } from './CommentText'
import { UserName } from './UserName'
import s from './s.module.scss'

interface CommentariesItemProps {
    className?: string
    style?: CSSProperties
    firstName?: string
    lastName?: string
    isOwner?: boolean
    answerInfo?: CommentsAnswerInfoType
}

export const CommentariesItem = memo((props: CommentariesItemProps) => {
    const { className, style, isOwner, answerInfo } = props
    const [responseMode, setResponseMode] = useState(false)

    const setAnswerName = useSetAnswerCommentNameSelector()
    const clearAnswerInfo = useClearAnswerInfoSelector()

    const answerStoreInfo = useGetAnswerInfoSelector()

    const { elementRef } = useOutsideClick({
        attached: responseMode,
        handler: () => {
            setResponseMode(false)
            clearAnswerInfo()
        },
    })

    const firstName = 'Данил'

    return (
        <div
            ref={elementRef}
            style={style}
            className={clsx(s.comm, className)}
        >
            <div className={s['comments-content']}>
                <UserAvatar
                    size='s'
                    className={s.avatar}
                />
                <div className={s.content}>
                    <div className={s['comm-text']}>
                        <UserName>Данил Гребнев:</UserName>

                        <CommentText>
                            Съешь ещё этих мягких французских булок, да выпей
                            чаю
                        </CommentText>
                    </div>

                    <CommentControl
                        onResponseClick={() => {
                            setAnswerName(firstName)
                            setResponseMode(true)
                        }}
                        date='1 мес назад'
                    />
                </div>
            </div>
            {responseMode && (
                <CommentariesWriteField
                    onSubmit={(text) => {
                        console.log(text)
                    }}
                    startWithText={answerStoreInfo.userName + ', ' || ''}
                    className={s['write-section']}
                    avatarSize='s'
                />
            )}
        </div>
    )
})

CommentariesItem.displayName = 'CommentariesItem'

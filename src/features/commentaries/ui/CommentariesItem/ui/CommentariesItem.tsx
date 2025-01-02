'use client'

import {
    useGetAnswerInfoSelector,
    useGetEditingInfoSelector,
    useSetAnswerInfoSelector,
    useSetEditingInfoSelector,
} from '@/features/commentaries/model/store/commentsStoreSelectors'
import {
    useAnswerCommentsMutation,
    useEditCommentsMutations,
} from '@/shared/api/comments'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import { TCommentsAuthor } from '@/shared/types/comments'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { memo, useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'

import { CommentariesWriteField } from '../../WriteCommentSection'
import { CommentControl } from './CommentControl'
import { CommentText } from './CommentText'
import { UserName } from './UserName'
import s from './s.module.scss'

interface CommentariesItemProps {
    className?: string
    firstName: string
    lastName: string
    isOwner?: boolean
    answerInfo?: TCommentsAuthor
    text: string
    commentId: string
    likeCount: number
    isLiked: boolean
}

export const CommentariesItem = memo((props: CommentariesItemProps) => {
    const {
        className,
        commentId,
        isOwner,
        answerInfo,
        isLiked,
        likeCount,
        firstName,
        lastName,
        text,
    } = props

    const setAnswerInfo = useSetAnswerInfoSelector()
    const setEditInfo = useSetEditingInfoSelector()
    const editInfo = useGetEditingInfoSelector()
    const answerStoreInfo = useGetAnswerInfoSelector()
    const { mutate: answerCommentMutate } = useAnswerCommentsMutation()
    const { mutate: editCommentMutate } = useEditCommentsMutations()

    const isResponseMode = useMemo(
        () => answerStoreInfo.commentId === commentId,
        [answerStoreInfo.commentId, commentId],
    )

    const isEditMode = useMemo(
        () => editInfo.commentId === commentId,
        [editInfo.commentId, commentId],
    )

    const isOpenBottomInput = isResponseMode || isEditMode

    const { elementRef } = useOutsideClick({
        attached: isOpenBottomInput,
        handler: () => {
            setAnswerInfo({ commentId: null, userName: null })
            setEditInfo({ commentId: null, text: null })
        },
    })

    const onSetAnswerCommentInfo = useCallback(() => {
        setAnswerInfo({ commentId, userName: firstName })
    }, [commentId, firstName])

    const onSetEditCommentInfo = useCallback(() => {
        setEditInfo({ commentId, text })
    }, [commentId, text])

    const createStartText = () => {
        if (isResponseMode) {
            return `${answerStoreInfo.userName}, `
        } else {
            return editInfo.text
        }
    }

    const onSubmit = (text: string) => {
        return new Promise((resolve, reject) => {
            if (isEditMode) {
                editCommentMutate(
                    { body: { text }, commentId },
                    { onSuccess: resolve, onError: reject },
                )
                return
            } else {
            }
        })
    }

    const onSuccessSubmit = () => {
        if (isEditMode) {
            toast.success('Изменение комментария успешно')
        } else {
            toast.success('Ответ на комментарий опубликован')
        }
    }

    const onErrorSubmit = () => {
        if (isEditMode) {
            toast.error('Ошибка изменения комментария')
        } else {
            toast.error('Ошибка ответа на комментарий')
        }
    }

    return (
        <div
            ref={elementRef}
            className={clsx(s.comm, className)}
        >
            <div className={s['comments-content']}>
                <UserAvatar
                    size='s'
                    className={s.avatar}
                />
                <div className={s.content}>
                    <div className={s['comm-text']}>
                        <UserName>{clsx(firstName, lastName)}:</UserName>
                        <CommentText>{text}</CommentText>
                    </div>

                    <CommentControl
                        isOwner={isOwner}
                        likeCount={likeCount}
                        isLiked={isLiked}
                        onEditClick={onSetEditCommentInfo}
                        onResponseClick={onSetAnswerCommentInfo}
                        date='1 мес назад'
                    />
                </div>
            </div>
            {isOpenBottomInput && (
                <CommentariesWriteField
                    className={s['write-section']}
                    avatarSize='s'
                    onSubmit={onSubmit}
                    startWithText={createStartText() || ''}
                    onErrorSubmit={onErrorSubmit}
                    onSuccessSubmit={onSuccessSubmit}
                />
            )}
        </div>
    )
})

CommentariesItem.displayName = 'CommentariesItem'

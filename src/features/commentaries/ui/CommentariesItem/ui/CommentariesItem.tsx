'use client'

import {
    useGetAnswerInfoSelector,
    useGetEditingCommentInfoSelector,
    useGetPostIdSelector,
    useSetAnswerInfoSelector,
    useSetCommentIdInQueueDeleteListSelector,
    useSetEditingInfoSelector,
} from '@/features/commentaries/model/store/commentsStoreSelectors'
import {
    useAnswerCommentsMutation,
    useEditCommentsMutations,
} from '@/shared/api/comments'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import { routes } from '@/shared/routes'
import { TCommentsAnswerInfo, TCommentsAuthor } from '@/shared/types/comments'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import Link from 'next/link'
import { memo, useCallback } from 'react'
import toast from 'react-hot-toast'

import { CommentariesWriteField } from '../../WriteCommentSection'
import { AnswerInfo } from './AnswerInfo'
import { CommentControl } from './CommentControl'
import { CommentText } from './CommentText'
import { DeleteCommentDialog } from './DeleteCommentDialog'
import { UserName } from './UserName'
import s from './s.module.scss'

interface CommentariesItemProps {
    className?: string
    author: TCommentsAuthor
    answerInfo: TCommentsAnswerInfo | null
    text: string
    commentId: string
    likeCount: number
    isLiked: boolean
    dateOfCreation: Date
}

export const CommentariesItem = memo((props: CommentariesItemProps) => {
    const {
        className,
        commentId,
        answerInfo,
        author,
        isLiked,
        likeCount,
        text,
        dateOfCreation,
    } = props

    const setAnswerInfo = useSetAnswerInfoSelector()
    const setEditInfo = useSetEditingInfoSelector()
    const editStoreInfo = useGetEditingCommentInfoSelector()
    const answerStoreInfo = useGetAnswerInfoSelector()
    const setCommentIdInQueueDeleteList =
        useSetCommentIdInQueueDeleteListSelector()

    const postId = useGetPostIdSelector()
    const { mutate: answerCommentMutate } = useAnswerCommentsMutation()
    const { mutate: editCommentMutate } = useEditCommentsMutations()

    const isResponseMode = answerStoreInfo.commentId === commentId
    const isEditMode = editStoreInfo.commentId === commentId
    const isOpenBottomInput = isResponseMode || isEditMode

    const { elementRef } = useOutsideClick({
        attached: isOpenBottomInput,
        handler: () => {
            setAnswerInfo({ commentId: null, userName: null })
            setEditInfo({ commentId: null, text: null })
        },
    })

    const onSetAnswerCommentInfo = useCallback(() => {
        setAnswerInfo({ commentId, userName: author.firstName })
    }, [commentId, author.firstName, setAnswerInfo])

    const onSetEditCommentInfo = useCallback(() => {
        setEditInfo({ commentId, text })
    }, [commentId, text, setEditInfo])

    const createStartText = () => {
        if (isResponseMode) {
            return `${answerStoreInfo.userName}, `
        } else {
            return editStoreInfo.text
        }
    }

    const onSubmit = async (text: string) => {
        if (isEditMode) {
            return new Promise((res, rej) => {
                editCommentMutate(
                    { body: { text }, commentId },
                    {
                        onSuccess: () => {
                            toast.success('Изменение комментария успешно')
                            setEditInfo({ commentId: null, text: null })
                            res('')
                        },
                        onError: () => {
                            toast.error('Ошибка изменения комментария')
                            rej()
                        },
                    },
                )
            })
        } else if (isResponseMode) {
            return new Promise((res, rej) => {
                if (!answerStoreInfo.commentId) return rej()

                answerCommentMutate(
                    {
                        postId,
                        body: {
                            answerCommentId: answerStoreInfo.commentId,
                            text,
                        },
                    },
                    {
                        onSuccess: () => {
                            toast.success('Ответ опубликован')
                            setAnswerInfo({ commentId: null, userName: null })
                            res('')
                        },
                        onError: () => {
                            toast.error('Ошибка ответа на комментарий')
                            rej('')
                        },
                    },
                )
            })
        }
    }

    return (
        <div
            ref={elementRef}
            className={clsx(s['comment-container'], className)}
        >
            <div className={s['comments-content']}>
                <Link href={routes.userDashboards.getRoute(author.authorId)}>
                    <UserAvatar
                        size='s'
                        href={author.avatar}
                        blurSrc={author.avatarBlur}
                        word={author.firstName[0]}
                        className={s.avatar}
                    />
                </Link>
                <div className={s.content}>
                    <div className={s['comm-text']}>
                        <UserName
                            firstName={author.firstName}
                            lastName={author.lastName}
                        />
                        {answerInfo && <AnswerInfo {...answerInfo} />}
                        <CommentText>{text}</CommentText>
                    </div>

                    <CommentControl
                        isOwner={author.isOwner}
                        likeCount={likeCount}
                        isLiked={isLiked}
                        onEdit={onSetEditCommentInfo}
                        onResponse={onSetAnswerCommentInfo}
                        onDelete={() => {
                            setCommentIdInQueueDeleteList(commentId)
                        }}
                        dateOfCreation={dateOfCreation}
                    />
                </div>
                <DeleteCommentDialog commentId={commentId} />
            </div>
            {isOpenBottomInput && (
                <CommentariesWriteField
                    className={s['write-section']}
                    avatarSize='s'
                    onSubmit={onSubmit}
                    startWithText={createStartText() || ''}
                />
            )}
        </div>
    )
})

CommentariesItem.displayName = 'CommentariesItem'

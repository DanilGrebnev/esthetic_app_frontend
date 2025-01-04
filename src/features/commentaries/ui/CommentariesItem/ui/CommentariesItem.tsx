'use client'

import { useAnswerOnComment } from '@/features/commentaries/model/hooks/useAnswerOnComment'
import { useCreateComment } from '@/features/commentaries/model/hooks/useCreateComment'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import { routes } from '@/shared/routes'
import {
    useGetAnswerInfoSelector,
    useGetEditingCommentInfoSelector,
    useSetAnswerInfoSelector,
    useSetCommentIdInQueueDeleteListSelector,
    useSetEditingInfoSelector,
} from '@/shared/store/comments'
import { TCommentsAnswerInfo, TCommentsAuthor } from '@/shared/types/comments'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import Link from 'next/link'
import { memo } from 'react'

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
    const setCommentIdInQueueDeleteList =
        useSetCommentIdInQueueDeleteListSelector()
    const createCommentMutate = useCreateComment()
    const answerOnCommentMutate = useAnswerOnComment()

    const editStoreInfo = useGetEditingCommentInfoSelector()
    const answerStoreInfo = useGetAnswerInfoSelector()

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

    const createStartText = () => {
        if (isResponseMode) {
            return answerStoreInfo.userName + ', '
        } else {
            return editStoreInfo.text + ''
        }
    }

    const onSubmit = async (text: string) => {
        if (isEditMode) {
            return createCommentMutate({ commentId, body: { text } })
        } else if (isResponseMode) {
            return answerOnCommentMutate({ commentId, body: { text } })
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
                        commentId={commentId}
                        onEdit={() => setEditInfo({ commentId, text })}
                        onResponse={() =>
                            setAnswerInfo({
                                commentId,
                                userName: author.firstName,
                            })
                        }
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
                    startWithText={createStartText()}
                />
            )}
        </div>
    )
})

CommentariesItem.displayName = 'CommentariesItem'

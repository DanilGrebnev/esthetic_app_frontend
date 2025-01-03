'use client'

import { CommentariesItem } from '@/features/commentaries'
import { useGetCommentsListQuery } from '@/shared/api/comments'
import { clsx } from 'clsx'
import { useCallback, useMemo } from 'react'
import { Virtuoso } from 'react-virtuoso'

interface CommentsListPosts {
    className?: string
    postId: string
}

export const CommentsList = ({ className, postId }: CommentsListPosts) => {
    const { data, fetchNextPage } = useGetCommentsListQuery({ postId })

    const commentsList = useMemo(
        () => data?.pages.map((page) => page.commentsList).flat(1),
        [data],
    )

    const onReached = useCallback(() => fetchNextPage(), [])

    return (
        <div className={clsx(className)}>
            <Virtuoso
                data={commentsList}
                endReached={onReached}
                itemContent={(
                    _,
                    {
                        answerInfo,
                        commentId,
                        author,
                        isLiked,
                        dateOfCreation,
                        text,
                        likeCount,
                    },
                ) => {
                    return (
                        <CommentariesItem
                            dateOfCreation={dateOfCreation}
                            author={author}
                            answerInfo={answerInfo}
                            likeCount={likeCount}
                            commentId={commentId}
                            text={text}
                            isLiked={isLiked}
                            className='py-[10px]'
                        />
                    )
                }}
            />
        </div>
    )
}

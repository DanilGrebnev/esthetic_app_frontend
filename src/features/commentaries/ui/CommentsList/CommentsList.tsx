'use client'

import { CommentariesItem, useSetPostIdSelector } from '@/features/commentaries'
import { useGetCommentsListQuery } from '@/shared/api/comments'
import { TCommentsItem } from '@/shared/types/comments'
import { clsx } from 'clsx'
import { useCallback, useEffect, useMemo } from 'react'
import { Virtuoso } from 'react-virtuoso'

interface CommentsListPosts {
    className?: string
    postId: string
}
const testComment: TCommentsItem = {
    commentId: 'jgjgjgjh',
    isLiked: false,
    likeCount: 2003,
    text: 'Юля чмо',
    answerInfo: null,
    dateOfCreation: new Date(),
    author: {
        authorId: '123123',
        avatar: null,
        avatarBlur: null,
        firstName: 'Yulia',
        lastName: 'Vaulina',
        isOwner: true,
        userName: 'sosi',
    },
}
export const CommentsList = ({ className, postId }: CommentsListPosts) => {
    const { data, fetchNextPage } = useGetCommentsListQuery({ postId })
    const setPostId = useSetPostIdSelector()

    useEffect(() => {
        setPostId(postId)
    }, [postId])

    // const commentsList = useMemo(
    //     () => data?.pages.map((page) => page.commentsList).flat(1),
    //     [data],
    // )

    const commentsList = [testComment]

    const onReached = useCallback(() => fetchNextPage, [])

    return (
        <div className={clsx(className)}>
            <Virtuoso
                data={commentsList}
                endReached={onReached}
                itemContent={(
                    _,
                    {
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
                            key={commentId}
                            likeCount={likeCount}
                            commentId={commentId}
                            text={text}
                            isLiked={isLiked}
                            firstName={author.firstName}
                            lastName={author.lastName}
                            isOwner={author.isOwner}
                            className='py-[10px]'
                        />
                    )
                }}
            />
        </div>
    )
}

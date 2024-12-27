'use client'

import { CommentariesItem } from '@/features/commentaries'
import { clsx } from 'clsx'
import { useEffect } from 'react'
import { Virtuoso } from 'react-virtuoso'

import s from './s.module.scss'

interface PostsDetailCommentsPosts {
    className?: string
    count: number
}

export const PostsDetailComments = ({
    className,
    count,
}: PostsDetailCommentsPosts) => {
    const commentariesList = Array(count)
        .fill('')
        .map((_, i) => i)

    return (
        <div className={clsx(s.comments, className)}>
            <Virtuoso
                totalCount={commentariesList.length}
                itemContent={(index) => {
                    return (
                        <CommentariesItem
                            className='py-[10px]'
                            key={index}
                        />
                    )
                }}
            />
        </div>
    )
}

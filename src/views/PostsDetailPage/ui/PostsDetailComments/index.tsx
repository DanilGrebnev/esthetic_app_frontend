import { CommentariesItem } from '@/widgets/CommentariesItem'
import { clsx } from 'clsx'
import { type FC } from 'react'

import s from './s.module.scss'

interface PostsDetailCommentsPosts {
    className?: string
    count: number
}

export const PostsDetailComments: FC<PostsDetailCommentsPosts> = ({
    className,
    count,
}) => {
    return (
        <div className={clsx(s.comments, className)}>
            {Array(count)
                .fill('')
                .map((_, i) => (
                    <CommentariesItem key={i} />
                ))}
        </div>
    )
}

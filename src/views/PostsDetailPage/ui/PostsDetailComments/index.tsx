import { CommentariesItem } from '@/features/commentaries'
import { clsx } from 'clsx'

import s from './s.module.scss'

interface PostsDetailCommentsPosts {
    className?: string
    count: number
}

export const PostsDetailComments = ({
    className,
    count,
}: PostsDetailCommentsPosts) => {
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

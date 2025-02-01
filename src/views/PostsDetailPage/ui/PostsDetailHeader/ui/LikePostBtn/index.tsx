'use client'

import {
    useGetDetailPostsQuery,
    useToggleLikeOnPostMutation,
} from '@/shared/api/posts'
import { LikeBtn } from '@/shared/ui/LikeBtn/LikeBtn'
import clsx from 'clsx'

interface LikePostBtnProps {
    likeCount: number
    className?: string
    postsId: string
}
export const LikePostBtn = (props: LikePostBtnProps) => {
    const { likeCount, postsId, className } = props
    const { mutate } = useToggleLikeOnPostMutation()
    const { data } = useGetDetailPostsQuery(postsId)

    return (
        <div className={clsx(className)}>
            <LikeBtn
                onClick={() => mutate(postsId)}
                enableLikeCount={true}
                likeCount={likeCount}
                isLiked={data?.user.isLike}
                unactive={data?.user.isOwner}
            />
        </div>
    )
}

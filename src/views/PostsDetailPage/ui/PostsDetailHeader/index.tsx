'use client'

import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn, MenuPostBtn } from '@/entities/posts'
import { useGetDetailPostsQuery } from '@/shared/api/posts'
import { WithPlaceholder } from '@/shared/ui/WithPlaceholder'
import { clsx } from 'clsx'

import s from './PostsDetailHeader.module.scss'
import { Description } from './ui/Description'
import { LikePostBtn } from './ui/LikePostBtn'
import { DownloadBtnSkeleton, SaveToDashboardBtnSkeleton } from './ui/Skeletons'
import { Title } from './ui/Title'
import { UserInfo } from './ui/UserInfo'

interface PostsDetailHeaderProps {
    className?: string
    postsId: string
}

export const PostsDetailHeader = (props: PostsDetailHeaderProps) => {
    const { className, postsId } = props

    const { data, isPending } = useGetDetailPostsQuery(postsId)
    const post = data?.post
    const user = data?.user

    const DowloandBtnWithPlaceholder = WithPlaceholder({
        Component: DownloadFileBtn,
        placeholder: <DownloadBtnSkeleton />,
        showPlaceholder: isPending,
    })

    const SaveToDashboardBtnWithPlaceholder = WithPlaceholder({
        Component: SaveToDashboardButton,
        placeholder: <SaveToDashboardBtnSkeleton />,
        showPlaceholder: isPending,
    })

    return (
        <header className={clsx(s.header, className)}>
            <div className={s.header__btn_group}>
                <div className={s.left_btn_group}>
                    <DowloandBtnWithPlaceholder
                        href={post?.media.url as string}
                        downloadFileName={post?.name as string}
                    />
                    <MenuPostBtn showBtn={!isPending && !!user?.isOwner} />
                </div>

                <div className={s.right_btn_group}>
                    <SaveToDashboardBtnWithPlaceholder
                        postsId={postsId}
                        className={s.save_btn}
                    />
                </div>
            </div>
            <div className={s.posts_info}>
                {/** TITLE  */}
                <Title
                    loading={isPending}
                    className={s.posts_info__title}
                >
                    {post?.name}
                </Title>

                {/** DESCRIPTION */}
                {post?.description && (
                    <Description>{post.description}</Description>
                )}

                {/**LIKE BUTTON */}
                <LikePostBtn
                    postsId={postsId}
                    className={s.like_post_btn}
                    likeCount={data?.post?.likeCount ?? 0}
                />

                {/** LINK */}
                {post?.link && <a href={post.link}>{post.link}</a>}

                {/** USER INFO */}
                <UserInfo
                    loading={isPending}
                    className={s.user_info}
                    avatar={post?.author?.avatar}
                    firstName={post?.author?.firstName}
                    lastName={post?.author?.lastName}
                    userId={post?.author?.userId}
                />
            </div>
        </header>
    )
}

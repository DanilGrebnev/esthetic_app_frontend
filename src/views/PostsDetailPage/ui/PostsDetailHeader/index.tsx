import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn, MenuPostBtn } from '@/entities/posts'
import { UserFullName } from '@/features/user'
import { routes } from '@/shared/routes'
import { TAuthor } from '@/shared/types/user'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './PostsDetailHeader.module.scss'
import { Description } from './ui/Description'
import { LikePostBtn } from './ui/LikePostBtn'

interface PostsDetailHeaderProps {
    className?: string
    pathToImg: string
    description: string
    title: string
    author: TAuthor
    postsId: string
    link?: string
    likeCount: number
}

export const PostsDetailHeader = (props: PostsDetailHeaderProps) => {
    const {
        className,
        pathToImg,
        description,
        title,
        author,
        postsId,
        link,
        likeCount,
    } = props

    return (
        <header className={clsx(s.header, className)}>
            <div className={s.header__btn_group}>
                <div className={s.left_btn_group}>
                    <DownloadFileBtn
                        href={pathToImg}
                        downloadFileName={title}
                    />
                    <MenuPostBtn postsId={postsId} />
                </div>

                <div className={s.right_btn_group}>
                    <SaveToDashboardButton
                        postsId={postsId}
                        className={s.save_btn}
                    />
                </div>
            </div>
            <div className={s.posts_info}>
                <h2 className={s.posts_info__title}>{title}</h2>

                {/** DESCRIPTION */}
                {description && <Description>{description}</Description>}

                {/**LIKE BUTTON */}
                <LikePostBtn
                    postsId={postsId}
                    className={s.like_post_btn}
                    likeCount={likeCount}
                />

                {/** LINK */}
                {link && <a href={link}>{link}</a>}

                {/**USER INFO */}
                <div className={s.user_info}>
                    <Link
                        href={routes.userCreatedPosts.getRoute(author?.userId)}
                    >
                        <UserAvatar
                            href={author?.avatar}
                            blurSrc={author?.avatarBlur}
                            word={author?.firstName[0]}
                            size='m'
                        />
                    </Link>
                    <UserFullName
                        size='normal'
                        firstName={author?.firstName}
                        lastName={author?.lastName}
                    />
                </div>
            </div>
        </header>
    )
}

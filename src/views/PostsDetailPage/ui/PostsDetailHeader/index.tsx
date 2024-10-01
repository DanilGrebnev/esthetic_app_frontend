import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn, MenuPostBtn } from '@/entities/posts'
import { routes } from '@/shared/routes'
import { TAuthor } from '@/shared/types/user'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import Link from 'next/link'
import { type FC } from 'react'

import s from './PostsDetailHeader.module.scss'

interface PostsDetailHeaderProps {
    className?: string
    pathToImg: string
    description: string
    title: string
    author: TAuthor
    postsId: string
}

export const PostsDetailHeader: FC<PostsDetailHeaderProps> = ({
    className,
    pathToImg,
    description,
    title,
    author,
    postsId,
}) => {
    return (
        <header className={clsx(s.header, className)}>
            <div className={s['header__btn-group']}>
                <div className={s['left-btn-group']}>
                    <DownloadFileBtn
                        href={pathToImg}
                        downloadFileName={title}
                    />
                    <MenuPostBtn postsId={postsId} />
                </div>

                <div className={s['right-btn-group']}>
                    <SaveToDashboardButton
                        postsId={postsId}
                        className={s['save-btn']}
                    />
                </div>
            </div>
            <div className={s['posts-info']}>
                <h2 className={s['posts-info__title']}>{title}</h2>
                {description && (
                    <p className={s['posts-info__description']}>
                        {description}
                    </p>
                )}
                <div className={s['user-info']}>
                    <Link
                        href={routes.userCreatedPosts.getRoute(author?.userId)}
                    >
                        <UserAvatar
                            href={author?.avatar}
                            size='m'
                        />
                    </Link>
                    <span>
                        {author?.firstName} {author?.lastName}
                    </span>
                </div>
            </div>
        </header>
    )
}

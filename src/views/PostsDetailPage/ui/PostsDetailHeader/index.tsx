import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn, MenuPostBtn } from '@/entities/posts'
import { TAuthor } from '@/shared/types/user'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
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
                    >
                        Сохранить
                    </SaveToDashboardButton>
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
                    <UserAvatar
                        href={author?.avatar}
                        size='m'
                    />
                    <span>
                        {author?.firstName} {author?.lastName}
                    </span>
                </div>
            </div>
        </header>
    )
}

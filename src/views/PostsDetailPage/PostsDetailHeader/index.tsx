import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn } from '@/entities/posts'
import { TAuthor } from '@/shared/types/user'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { type FC } from 'react'

import s from './s.module.scss'

interface PostsDetailHeaderProps {
    className?: string
    pathToImg: string
    description: string
    title: string
    author: TAuthor
    postId: string
}

export const PostsDetailHeader: FC<PostsDetailHeaderProps> = ({
    className,
    pathToImg,
    description,
    title,
    author,
    postId,
}) => {
    return (
        <header className={clsx(s.header, className)}>
            <div className={s['header__btn-group']}>
                <DownloadFileBtn
                    href={pathToImg}
                    downloadFileName={title}
                />
                <SaveToDashboardButton
                    /*
                     * TODO: СТРАНИЦА ДЕТАЛКИ ПОСТОВ - добавить реальный postsId
                     *  в кнопку сохранения поста */
                    postsId={postId}
                    className={s['save-btn']}
                >
                    Сохранить
                </SaveToDashboardButton>
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

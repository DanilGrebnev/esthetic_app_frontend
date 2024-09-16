import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn } from '@/entities/posts'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { type FC } from 'react'

import s from './s.module.scss'

interface PostsDetailHeaderProps {
    className?: string
    pathToImg: string
    authorAvatar: string
    description: string
    title: string
}

export const PostsDetailHeader: FC<PostsDetailHeaderProps> = ({
    className,
    pathToImg,
    authorAvatar,
    description,
    title,
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
                    postsId={'postsId'}
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
                        href={authorAvatar}
                        size='m'
                    />
                    <span>Данил Гребнев</span>
                </div>
            </div>
        </header>
    )
}

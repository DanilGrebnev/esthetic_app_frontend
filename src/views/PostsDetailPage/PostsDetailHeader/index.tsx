import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn } from '@/entities/posts'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { type FC } from 'react'

import s from './s.module.scss'

interface PostsDetailHeaderProps {
    className?: string
    pathToImg: string
}

export const PostsDetailHeader: FC<PostsDetailHeaderProps> = ({
    className,
    pathToImg,
}) => {
    return (
        <header className={clsx(s.header, className)}>
            <div className={s['header__btn-group']}>
                <DownloadFileBtn
                    href={pathToImg}
                    downloadFileName={'test'}
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
                <h2 className={s['posts-info__title']}>BMW M5 Compitition</h2>
                <p className={s['posts-info__description']}>
                    Описание к BMW M5 Compitition
                </p>
                <div className={s['user-info']}>
                    <UserAvatar size='m' /> <span>Данил Гребнев</span>
                </div>
            </div>
        </header>
    )
}

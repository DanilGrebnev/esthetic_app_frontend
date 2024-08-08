import { DownloadFileBtn, SavePostsButton } from '@/entities/posts'
import { UserAvatar } from '@/features/user'
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
                <SavePostsButton className={s['save-btn']} />
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
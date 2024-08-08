import { DownloadFileBtn, SavePostsButton } from '@/entities/posts'
import { clsx } from 'clsx'
import { type FC } from 'react'

import s from './s.module.scss'

interface Props {
    className?: string
    pathToImg: string
}

export const PostsDetailHeader: FC<Props> = ({ className, pathToImg }) => {
    return (
        <header className={clsx(s['posts-content__header'], className)}>
            <div className={s['header__btn-group']}>
                <DownloadFileBtn
                    href={pathToImg}
                    downloadFileName={'test'}
                />
                <SavePostsButton className={s['save-btn']} />
            </div>

            <div className={s['header__posts-info']}>
                <h2 className={s['posts-info__title']}>BMW M5 Compitition</h2>
                <p className={s['posts-info__description']}>
                    Описание к BMW M5 Compitition
                </p>
            </div>
        </header>
    )
}

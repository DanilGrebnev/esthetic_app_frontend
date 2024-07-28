import clsx from 'clsx'
import { type FC } from 'react'

import { ITilesInfo } from '../tyles-types'
import s from './s.module.scss'

interface TilesInfo extends ITilesInfo {
    className?: string
}

export const TilesInfo: FC<TilesInfo> = (props) => {
    const { className, date, title, postsCount } = props

    return (
        <div className={clsx(s['tiles-info'], className)}>
            <h5 className={s.title}>{title}</h5>
            <div className={s.footer}>
                <p className={s.count}>{postsCount} пин</p>
                <p className={s.date}>{date} нед.</p>
            </div>
        </div>
    )
}

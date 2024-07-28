'use client'

import { consts } from '@/shared/consts'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FC, memo } from 'react'

import { TilesInfo } from './TilesInfo'
import s from './tiles.module.scss'
import { type ITilesInfo } from './tyles-types'

interface IDashboardTile extends ITilesInfo {
    className?: string
    images: string[] | []
}

export const DashboardTile: FC<IDashboardTile> = memo((props) => {
    const { postsCount, title, date, images, className } = props

    return (
        <div className={clsx(s['dashboard-tile'], className)}>
            <div className={s['dashboard-tile__images-wrapper']}>
                {Array(3)
                    .fill('')
                    .map((_, i) => {
                        const imageUrl = images[i]
                        return (
                            <div
                                key={i}
                                className={clsx(s[`img-${i + 1}`], s.img)}
                            >
                                {imageUrl && (
                                    <Image
                                        alt='test'
                                        fill={true}
                                        src={imageUrl}
                                    />
                                )}
                            </div>
                        )
                    })}
            </div>
            <TilesInfo
                postsCount={postsCount}
                date={date}
                title={title}
            />
        </div>
    )
})

DashboardTile.displayName = 'PostsDashboardTile'

'use client'

import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FC, memo } from 'react'

import { TileContext } from '../model/tileContext'
import { type ITilesInfo } from '../model/tyles-types'
import { TilesInfo } from './TilesInfo'
import s from './tiles.module.scss'

interface IDashboardTile extends ITilesInfo {
    className?: string
    images: string[] | []
    href: string
    dotMenu?: boolean
    dashboardId: string
}

export const DashboardTile: FC<IDashboardTile> = memo((props) => {
    const {
        postsCount,
        href,
        dotMenu = false,
        title,
        date,
        images,
        dashboardId,
    } = props

    const router = useRouter()
    const a = Array(3).fill(null)

    const onClick = () => {
        router.push(href)
    }

    return (
        <TileContext.Provider value={{ dashboardId }}>
            <div
                onClick={onClick}
                className={clsx(s['dashboard-tile'])}
            >
                <div className={s['dashboard-tile__images-wrapper']}>
                    {a.map((_, i) => {
                        const url = images[i]

                        return (
                            <div
                                key={i}
                                className={clsx(s[`img-${i + 1}`], s.img)}
                            >
                                {url && (
                                    <Image
                                        alt='preview'
                                        fill={true}
                                        src={url}
                                        className={s.image}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
                <TilesInfo
                    dotMenu={dotMenu}
                    postsCount={postsCount}
                    date={date}
                    title={title}
                />
            </div>
        </TileContext.Provider>
    )
})

DashboardTile.displayName = 'PostsDashboardTile'

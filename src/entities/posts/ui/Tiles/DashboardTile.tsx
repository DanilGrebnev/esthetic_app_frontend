'use client'

import { routes } from '@/shared/routes'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FC, memo } from 'react'

import { TilesInfo } from './TilesInfo'
import s from './tiles.module.scss'
import { type ITilesInfo } from './tyles-types'

interface IDashboardTile extends ITilesInfo {
    className?: string
    images: string[] | []
    href: string
}

export const DashboardTile: FC<IDashboardTile> = memo((props) => {
    const { postsCount, href, title, date, images, className } = props
    const router = useRouter()
    const a = Array(3).fill(null)

    const onClick = () => {
        router.push(href)
    }

    return (
        <div
            onClick={onClick}
            className={clsx(s['dashboard-tile'], className)}
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

'use client'

import { ImageWithBlure } from '@/shared/ui/ImageWithBlure'
import { clsx } from 'clsx'
import { m } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FC, memo } from 'react'

import { TileContext } from '../model/tileContext'
import { type ITilesInfo } from '../model/tyles-types'
import { TilesInfo } from './TilesInfo/TilesInfo'
import s from './tiles.module.scss'

interface IDashboardTile extends ITilesInfo {
    className?: string
    images: string[] | []
    href: string
    dotMenu?: boolean
    dashboardId: string
    blureImages: string[]
}

export const DashboardTile: FC<IDashboardTile> = memo((props) => {
    const {
        postsCount,
        href,
        dotMenu = false,
        blureImages,
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
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
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
                                    <ImageWithBlure
                                        alt='preview'
                                        fill={true}
                                        src={url}
                                        quality={10}
                                        placeholder='blur'
                                        blurDataURL={blureImages[i]}
                                        className={s.image}
                                        sizes={'200px'}
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
            </m.div>
        </TileContext.Provider>
    )
})

DashboardTile.displayName = 'PostsDashboardTile'

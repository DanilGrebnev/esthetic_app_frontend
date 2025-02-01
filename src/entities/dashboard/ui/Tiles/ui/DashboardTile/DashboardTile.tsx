'use client'

import { DashboardContextProvider } from '@/entities/dashboard/model/dashboardContext'
import { useRouter } from 'next/navigation'

import { type ITilesInfo } from '../../model/tyles-types'
import { DashboardTileImageRender } from '../DashboardTile/DashboardTileImageRender'
import { TilesInfo } from '../TilesInfo/TilesInfo'
import s from './dashboard-tile.module.scss'

interface IDashboardTile extends ITilesInfo {
    className?: string
    images: string[] | []
    href: string
    dotMenu?: boolean
    dashboardId: string
    blureImages: string[]
}

export const DashboardTile = (props: IDashboardTile) => {
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

    const onClick = () => {
        router.push(href)
    }

    return (
        <DashboardContextProvider
            dashboardInfo={{ dashboardId, dashboardName: title }}
        >
            <div
                onClick={onClick}
                className={s.dashboard_tile}
            >
                <DashboardTileImageRender
                    images={images}
                    blureImages={blureImages}
                />
                <TilesInfo
                    dotMenu={dotMenu}
                    postsCount={postsCount}
                    date={date}
                    title={title}
                />
            </div>
        </DashboardContextProvider>
    )
}

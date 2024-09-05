'use client'

import { consts } from '@/shared/consts'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { Skeleton } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import { type FC } from 'react'

import s from './s.module.scss'
import { getDashboardItemTitle } from './utils'

interface DashboardItemProps {
    loading?: boolean
    disabled?: boolean
    dashboardName: string
    skeleton?: boolean
}

export const DashboardItem: FC<DashboardItemProps> = (props) => {
    const { loading, dashboardName, disabled, skeleton } = props

    return (
        <div
            title={getDashboardItemTitle(disabled, dashboardName)}
            className={clsx(s['dashboard-item'], { [s.disabled]: disabled })}
        >
            <div className={clsx(s.content)}>
                {!skeleton ? (
                    <>
                        <Image
                            className={s['dashboard-item__img']}
                            src={consts.pathToImage + 't1.jpg'}
                            width={40}
                            height={40}
                            alt='test'
                        />
                        <p className='text-ellipsis'>{dashboardName}</p>
                    </>
                ) : (
                    <Skeletons />
                )}
            </div>
            {loading && <CircularProgress sizesVariant='s' />}
        </div>
    )
}

function Skeletons() {
    return (
        <>
            <Skeleton
                width={40}
                height={40}
                variant='rounded'
            />
            <Skeleton
                width={100}
                height={12}
                variant='rounded'
            />
        </>
    )
}

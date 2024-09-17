'use client'

import { CircularProgress } from '@/shared/ui/CircularProgress'
import { Skeleton } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import { type FC } from 'react'

import { getDashboardItemTitle } from '../model/utils'
import { Placeholder } from './Placeholder'
import s from './s.module.scss'

interface DashboardItemProps {
    loading?: boolean
    disabled?: boolean
    dashboardName: string
    skeleton?: boolean
    image?: string
    onClick?: () => void
}

export const DashboardItem: FC<DashboardItemProps> = (props) => {
    const { loading, dashboardName, onClick, image, disabled, skeleton } = props

    return (
        <div
            title={getDashboardItemTitle(disabled, dashboardName)}
            onClick={onClick}
            className={clsx(s['dashboard-item'], {
                [s.disabled]: disabled,
                [s.inactive]: loading,
            })}
        >
            <div className={clsx(s.content)}>
                {skeleton && <Skeletons />}
                {!skeleton && (
                    <>
                        {image && (
                            <Image
                                className={s['dashboard-item__img']}
                                src={image}
                                width={40}
                                height={40}
                                alt='test'
                            />
                        )}
                        {!image && <Placeholder />}
                        <p className='text-ellipsis'>{dashboardName}</p>
                    </>
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

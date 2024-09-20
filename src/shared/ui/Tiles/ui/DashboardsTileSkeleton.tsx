import { Skeleton } from '@mui/material'
import { clsx } from 'clsx'

import s from './tiles.module.scss'

export const DashboardsTileSkeleton = () => {
    const a = Array(3).fill(null)

    return (
        <div className={clsx(s['dashboard-tile'])}>
            <div className={s['dashboard-tile__images-wrapper']}>
                {a.map((_, i) => {
                    return (
                        <Skeleton
                            variant='rectangular'
                            style={{ height: '100%' }}
                            key={i}
                            className={clsx(s[`img-${i + 1}`], s.img)}
                        ></Skeleton>
                    )
                })}
            </div>
            <Skeleton style={{ width: '80%', height: '27px' }} />
            <div style={{ display: 'flex', gap: 'var(--global-gap-1)' }}>
                <Skeleton style={{ width: '20%', height: '20px' }} />
                <Skeleton style={{ width: '20%', height: '20px' }} />
            </div>
        </div>
    )
}

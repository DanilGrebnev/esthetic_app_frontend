import { Skeleton } from '@/shared/ui/Skeleton'
import { clsx } from 'clsx'

import s from './s.tiles-skeleton.module.scss'

export const DashboardsTileSkeleton = () => {
    const a = Array(3).fill(null)

    return (
        <div className={clsx(s['dashboard-tile'])}>
            <div className={clsx(s.render_container, s.cursor_pointer)}>
                {a.map((_, i) => {
                    return (
                        <Skeleton
                            key={i}
                            style={{ height: '100%' }}
                            className={clsx(s[`img-${i + 1}`], s.img)}
                        ></Skeleton>
                    )
                })}
            </div>
            <Skeleton className='w-full h-[27px]' />
            <div style={{ display: 'flex', gap: 'var(--global-gap-1)' }}>
                <Skeleton style={{ width: '20%', height: '20px' }} />
                <Skeleton style={{ width: '20%', height: '20px' }} />
            </div>
        </div>
    )
}

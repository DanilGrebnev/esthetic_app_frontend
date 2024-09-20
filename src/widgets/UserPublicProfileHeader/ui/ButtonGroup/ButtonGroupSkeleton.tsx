'use client'

import { Skeleton } from '@mui/material'

export const ButtonGroupSkeleton = () => {
    return (
        <div style={{ display: 'flex', gap: 'var(--global-gap-1)' }}>
            <Skeleton
                variant='rectangular'
                style={{
                    borderRadius: 'var(--global-border-radius)',
                    width: '130px',
                    minHeight: '48px',
                }}
            />
            <Skeleton
                variant='rectangular'
                style={{
                    borderRadius: 'var(--global-border-radius)',
                    width: '130px',
                    minHeight: '48px',
                }}
            />
        </div>
    )
}

import { Skeleton } from '@mui/material'
import { ReactNode } from 'react'

interface TitleProps {
    children?: ReactNode
    loading?: boolean
    className?: string
}
export const Title = (props: TitleProps) => {
    const { children, loading, className } = props
    if (loading) {
        return <Skeleton className='h-[21px]' />
    }

    return <h2 className={className}>{children}</h2>
}

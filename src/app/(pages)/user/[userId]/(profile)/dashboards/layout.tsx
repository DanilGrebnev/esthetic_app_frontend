'use client'

import { CreateDashboardButton } from '@/entities/dashboard/ui/CreateDashboardButton'
import { useGetPublicProfileQuery } from '@/shared/api/users'
import type { FC, ReactNode } from 'react'

interface Layout {
    children?: ReactNode
    params: {
        userId: string
    }
}

const Layout: FC<Layout> = (props) => {
    const { children, params } = props

    const { data } = useGetPublicProfileQuery({ userId: params?.userId })

    return (
        <div id='Users dashboards'>
            {data?.guest?.isOwner && <CreateDashboardButton />}
            {children}
        </div>
    )
}

export default Layout

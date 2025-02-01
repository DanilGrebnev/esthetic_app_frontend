'use client'

import { CreateDashboardButton } from '@/entities/dashboard'
import { useGetPublicProfileQuery } from '@/shared/api/users'
import { type ReactNode, use } from 'react'

interface Layout {
    children?: ReactNode
    params: Promise<{
        userId: string
    }>
}

const Layout = (props: Layout) => {
    const { children } = props
    const { userId } = use(props.params)
    const { data } = useGetPublicProfileQuery({ userId })

    return (
        <div id='Users dashboards'>
            {data?.guest?.isOwner && <CreateDashboardButton />}
            {children}
        </div>
    )
}

export default Layout

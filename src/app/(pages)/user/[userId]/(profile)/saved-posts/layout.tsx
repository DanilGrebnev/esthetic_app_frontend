'use client'

import { CreateDashboardFromUserProfile } from '@/entities/dashboard/ui/CreateDashboardFromUserProfile'
import { useGetPublicProfile } from '@/shared/api/users'
import { Container } from '@/shared/ui/Container'
import { FC, ReactNode, useEffect } from 'react'

import s from './layout.module.scss'

interface Layout {
    children?: ReactNode
    params: {
        userId: string
    }
}
const Layout: FC<Layout> = (props) => {
    const { children, params } = props

    const { data } = useGetPublicProfile({ userId: params?.userId })

    return (
        <Container size='l'>
            {data?.guest?.isOwner && <CreateDashboardFromUserProfile />}
            {children}
        </Container>
    )
}

export default Layout

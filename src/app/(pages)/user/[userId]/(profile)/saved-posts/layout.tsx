'use client'

import { CreateDashboardButton } from '@/entities/dashboard/ui/CreateDashboardButton'
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
            {data?.guest?.isOwner && <CreateDashboardButton />}
            {children}
        </Container>
    )
}

export default Layout

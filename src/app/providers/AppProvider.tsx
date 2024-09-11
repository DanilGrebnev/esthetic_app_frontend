'use client'

import { AuthProvider } from '@/entities/auth'
import { type Layout } from '@/shared/types/layout'
import { type FC } from 'react'

import { TanStackQueryProvider } from './TanStackQueryProvider'

export const AppProvider: FC<Layout> = ({ children }) => {
    return (
        <TanStackQueryProvider>
            <AuthProvider>{children}</AuthProvider>
        </TanStackQueryProvider>
    )
}

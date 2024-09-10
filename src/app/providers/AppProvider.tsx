'use client'

import { type Layout } from '@/shared/types/layout'
import { type FC } from 'react'

import { AuthProvider } from '../providers/AuthProvider'
import { TanStackQueryProvider } from './TanStackQueryProvider'

export const AppProvider: FC<Layout> = ({ children }) => {
    return (
        <TanStackQueryProvider>
            <AuthProvider>{children}</AuthProvider>
        </TanStackQueryProvider>
    )
}

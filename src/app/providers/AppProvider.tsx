'use client'

import { AuthProvider } from '@/entities/auth'
import { type Layout } from '@/shared/types/layout'
import { LazyMotion, domAnimation } from 'framer-motion'
import { type FC } from 'react'

import { TanStackQueryProvider } from './TanStackQueryProvider'

export const AppProvider: FC<Layout> = ({ children }) => {
    return (
        <TanStackQueryProvider>
            <LazyMotion features={domAnimation}>
                <AuthProvider>{children}</AuthProvider>
            </LazyMotion>
        </TanStackQueryProvider>
    )
}

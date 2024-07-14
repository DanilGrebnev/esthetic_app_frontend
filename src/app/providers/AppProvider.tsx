'use client'

import { type Layout } from '@/shared/types/layout'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { type FC } from 'react'

import { TanStackQueryProvider } from './TanStackQueryProvider'

export const AppProvider: FC<Layout> = ({ children }) => {
    return (
        // <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <TanStackQueryProvider>{children}</TanStackQueryProvider>
        // </AppRouterCacheProvider>
    )
}

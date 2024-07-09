'use client'

import { type Layout } from '@/shared/types/layout'
import { QueryClientProvider } from '@tanstack/react-query'
import { type FC } from 'react'

import { getQueryClient } from './get-query-client'

export const TanStackQueryProvider: FC<Layout> = ({ children }) => {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

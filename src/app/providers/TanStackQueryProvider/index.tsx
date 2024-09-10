'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import type { FC, ReactNode } from 'react'

import { getQueryClient } from './get-query-client'

export const TanStackQueryProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

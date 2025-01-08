'use client'

import { Layout } from '@/shared/types/layout'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { getQueryClient } from './get-query-client'

export const TanStackQueryProvider = ({ children }: Layout) => {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    )
}

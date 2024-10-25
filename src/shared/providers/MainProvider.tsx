import { AuthProvider } from '@/entities/auth'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ReactNode } from 'react'

import { TanStackQueryProvider } from './TanStackQueryProvider'

export const MainProvider = ({ children }: { children: ReactNode }) => {
    return (
        <TanStackQueryProvider>
            <LazyMotion features={domAnimation}>
                <AuthProvider>{children}</AuthProvider>
            </LazyMotion>
        </TanStackQueryProvider>
    )
}

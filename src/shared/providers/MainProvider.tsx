import { AuthProvider } from '@/entities/auth'
import { FramerMotionProvider } from '@/shared/providers/FramerMotionProvider'
import { MUIProvider } from '@/shared/providers/MUIProvider'
import { ReactNode } from 'react'

import { TanStackQueryProvider } from './TanStackQueryProvider'

export const MainProvider = ({ children }: { children: ReactNode }) => {
    return (
        <TanStackQueryProvider>
            <FramerMotionProvider>
                <AuthProvider>
                    <MUIProvider>{children}</MUIProvider>
                </AuthProvider>
            </FramerMotionProvider>
        </TanStackQueryProvider>
    )
}

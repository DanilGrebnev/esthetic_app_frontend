import { AuthProvider } from '@/entities/auth'
import { FramerMotionProvider } from '@/shared/providers/FramerMotionProvider'
import { MUIProvider } from '@/shared/providers/MUIProvider'
import { ReactNode } from 'react'

import { TanStackQueryProvider } from './TanStackQueryProvider'
import { ToasterProvider } from './ToasterProvider'

export const MainProvider = ({ children }: { children: ReactNode }) => {
    return (
        <TanStackQueryProvider>
            <FramerMotionProvider>
                <AuthProvider>
                    <ToasterProvider>
                        <MUIProvider>{children}</MUIProvider>
                    </ToasterProvider>
                </AuthProvider>
            </FramerMotionProvider>
        </TanStackQueryProvider>
    )
}

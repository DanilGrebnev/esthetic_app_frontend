import { AuthProvider } from '@/entities/auth'
import { ReactNode } from 'react'

import { Layout } from '../types/layout'
import { EnabledMapSetImmerProvider } from './EnabledMapSetImmerProvider'
import { FramerMotionProvider } from './FramerMotionProvider'
import { MUIProvider } from './MUIProvider'
import { TanStackQueryProvider } from './TanStackQueryProvider'
import { ToasterProvider } from './ToasterProvider'

export const MainProvider = ({ children }: Layout) => {
    return (
        <TanStackQueryProvider>
            <FramerMotionProvider>
                <EnabledMapSetImmerProvider>
                    <AuthProvider>
                        <ToasterProvider>
                            <MUIProvider>{children}</MUIProvider>
                        </ToasterProvider>
                    </AuthProvider>
                </EnabledMapSetImmerProvider>
            </FramerMotionProvider>
        </TanStackQueryProvider>
    )
}

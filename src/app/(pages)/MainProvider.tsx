import { AuthProvider } from '@/entities/auth'
import { DeleteCommentsAfterFirstMount } from '@/features/commentaries'
import { EnabledMapSetImmerProvider } from '@/shared/providers/EnabledMapSetImmerProvider'
import { FramerMotionProvider } from '@/shared/providers/FramerMotionProvider'
import { MUIProvider } from '@/shared/providers/MUIProvider'
import { TanStackQueryProvider } from '@/shared/providers/TanStackQueryProvider'
import { ToasterProvider } from '@/shared/providers/ToasterProvider'
import { Layout } from '@/shared/types/layout'

export const MainProvider = ({ children }: Layout) => {
    return (
        <TanStackQueryProvider>
            <FramerMotionProvider>
                <EnabledMapSetImmerProvider>
                    <AuthProvider>
                        <ToasterProvider>
                            <MUIProvider>
                                <DeleteCommentsAfterFirstMount>
                                    {children}
                                </DeleteCommentsAfterFirstMount>
                            </MUIProvider>
                        </ToasterProvider>
                    </AuthProvider>
                </EnabledMapSetImmerProvider>
            </FramerMotionProvider>
        </TanStackQueryProvider>
    )
}
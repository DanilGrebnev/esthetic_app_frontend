import { roboto } from '@/shared/fonts'
import { Layout } from '@/shared/types/layout'
import { _ModalProvider } from '@/shared/ui/modal'
import { clsx } from 'clsx'
import type { Metadata } from 'next'
import { type FC } from 'react'

import { AppProvider } from '../providers/AppProvider'
import '../styles/globals.css'
import '../styles/reset.css'
import '../styles/root.css'

export const metadata: Metadata = {
    title: 'Esthetic',
    description: 'This is a "Esthetic App"',
}

const RootLayout: FC<Layout> = ({ children }) => {
    return (
        <html lang='ru'>
            <body className={clsx(roboto.variable)}>
                <_ModalProvider />
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    )
}

export default RootLayout

import { roboto } from '@/shared/fonts'
import { MainProvider } from '@/shared/providers/MainProvider'
import { Layout } from '@/shared/types/layout'
import { _ModalRoot } from '@/shared/ui/modal'
import { clsx } from 'clsx'
import type { Metadata } from 'next'
import { type FC } from 'react'

import '../styles/globals.css'
import '../styles/reset.css'
import '../styles/root.css'
import '../styles/tailwind-global.css'

export const metadata: Metadata = {
    title: 'Esthetic',
    description: 'This is a "Esthetic App"',
}

const RootLayout: FC<Layout> = ({ children }) => {
    return (
        <html lang='ru'>
            <body className={clsx(roboto.variable)}>
                <_ModalRoot />
                <MainProvider>{children}</MainProvider>
            </body>
        </html>
    )
}

export default RootLayout

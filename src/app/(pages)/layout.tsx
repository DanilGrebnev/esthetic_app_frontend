import { inter } from '@/shared/fonts'
import type { Metadata } from 'next'

import { AppProvider } from '../providers/AppProvider'
import '../styles/globals.css'
import '../styles/reset.css'
import '../styles/root.css'

export const metadata: Metadata = {
    title: 'Esthetic',
    description: 'This is a "Esthetic App"',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='ru'>
            <body>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    )
}

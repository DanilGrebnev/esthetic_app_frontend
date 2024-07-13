import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { AppProvider } from '../providers/AppProvider'
import '../styles/globals.css'
import '../styles/root.css'

const inter = Inter({ subsets: ['latin'] })

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
            <body className={inter.className}>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    )
}

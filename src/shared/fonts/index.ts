import { Inter, Roboto } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })
export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['300', '400'],
    variable: '--font-roboto',
    style: 'normal',
})

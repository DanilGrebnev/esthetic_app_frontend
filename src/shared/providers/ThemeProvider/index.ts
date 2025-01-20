import dynamic from 'next/dynamic'

export const ThemeProvider = dynamic(
    () => import('./themeContext').then(({ ThemeProvider }) => ThemeProvider),
    { ssr: false },
)

export { useGetThemeContext } from './themeContext'

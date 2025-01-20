'use client'

import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from 'react'

enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

interface TThemeContext {
    theme: string
    toggleTheme: () => void
}

const ThemeContext = createContext({
    theme: Theme.LIGHT,
    toggleTheme: () => {},
} as TThemeContext)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme[number]>(Theme.LIGHT)

    const toggleTheme = useCallback(() => {
        if (theme === Theme.LIGHT) {
            setTheme(Theme.DARK)
        } else {
            setTheme(Theme.LIGHT)
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <main
                id='theme-provider'
                className={theme}
            >
                {children}
            </main>
        </ThemeContext.Provider>
    )
}

export const useGetThemeContext = () => useContext(ThemeContext)

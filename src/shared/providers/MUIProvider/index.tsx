'use client'

import { StyledEngineProvider } from '@mui/material'
import { ReactNode } from 'react'

export const MUIProvider = ({ children }: { children: ReactNode }) => {
    return (
        <StyledEngineProvider injectFirst={true}>
            {children}
        </StyledEngineProvider>
    )
}

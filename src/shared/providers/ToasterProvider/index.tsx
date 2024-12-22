'use client'

import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface ToasterProviderProps {
    children: ReactNode
}
export const ToasterProvider = ({ children }: ToasterProviderProps) => {
    return (
        <>
            {children}
            <Toaster />
        </>
    )
}

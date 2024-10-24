'use client'

import { type FC, type ReactNode, createContext, useContext } from 'react'

interface ModalContext {
    isOpen: boolean
    onClose?: () => void
}

const ModalContext = createContext({} as ModalContext)

interface ModalContextProviderProps {
    children: ReactNode
    value: ModalContext
}

export const ModalProvider: FC<ModalContextProviderProps> = ({
    children,
    value,
}) => {
    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    )
}

export const useModalContext = () => {
    return useContext(ModalContext)
}

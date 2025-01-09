import { ReactNode } from 'react';


export interface TModalContext {
    isOpen: boolean
    onClose?: () => void
}

export interface ModalContextProviderProps {
    children: ReactNode
    value: TModalContext
}
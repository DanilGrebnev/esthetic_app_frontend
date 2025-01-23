import { CSSProperties, type MutableRefObject, type ReactNode } from 'react'

export interface TProgressWindowContext {
    onNext: () => void
    onPrev: () => void
    currentPage: number
    totalPages: number
    isLastPage: boolean
}

/* Приватный контекст */
export interface TPrivateProgressWindowContext {
    parentContainerWidth?: number
    containerRef: MutableRefObject<HTMLDivElement | null>
    setPagesAmount: (pagesAmount: number) => void
    currentPage: number
}

export interface ProgressWindowProviderProps {
    className?: string
    children?: ReactNode | ReactNode[]
}

export type TSetting = { transition?: number }

export interface TProgressWindowContainer {
    children: ReactNode[]
    className?: string
    setting?: TSetting
}

export interface ProgressWindowTabProps {
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

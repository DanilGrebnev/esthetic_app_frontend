import {
    CSSProperties,
    Dispatch,
    type ReactNode,
    Ref,
    SetStateAction,
} from 'react'

export interface TProgressWindowContext {
    onNext: () => void
    onPrev: () => void
    currentPage: number
    totalPages: number
    isLastPage: boolean
    setCurrentPage: Dispatch<SetStateAction<number>>
}

/* Приватный контекст */
export interface TPrivateProgressWindowContext {
    parentContainerWidth?: number
    containerRef: Ref<HTMLDivElement | null>
    setPagesAmount: (pagesAmount: number) => void
    currentPageInView: number
}

export interface ProgressWindowProviderProps {
    className?: string
    children?: ReactNode | ReactNode[]
}

export type TSetting = { transition?: number }

export interface TProgressWindowContainer {
    children: ReactNode[]
    className?: string
    /** in seconds */
    setting?: TSetting
}

export interface ProgressWindowTabProps {
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

'use client'

import { useGetComponentSizes } from '@/shared/hooks/useGetComponentSizes'
import { useLatest } from '@/shared/hooks/useLatest'
import { useCallback, useId, useState } from 'react'

import type {
    ProgressWindowProviderProps,
    TPrivateProgressWindowContext,
    TProgressWindowContext,
} from '../types'
import {
    PrivateProgressWindowContext,
    ProgressWindowContext,
} from './ProgressWindowContext'

export const ProgressWindowProvider = ({
    children,
}: ProgressWindowProviderProps) => {
    const containerId = useId()
    const [currentPage, setCurrentPage] = useState(0)
    const latestCurrentPage = useLatest(currentPage)
    const [totalPages, setTotalPages] = useState(0)
    const { nodeRef, width } = useGetComponentSizes<HTMLDivElement>()

    const setPagesAmount = useCallback((pagesAmount: number) => {
        setTotalPages(pagesAmount)
    }, [])

    const onNext = useCallback(() => {
        if (latestCurrentPage.current + 1 === totalPages) return
        setCurrentPage((p) => p + 1)
    }, [totalPages, latestCurrentPage])

    const onPrev = useCallback(() => {
        if (!latestCurrentPage.current) return
        setCurrentPage((p) => p - 1)
    }, [latestCurrentPage])

    const context: TProgressWindowContext = {
        onNext,
        onPrev,
        currentPage: currentPage + 1,
        totalPages,
        isLastPage: currentPage + 1 === totalPages,
    }

    const privateContext: TPrivateProgressWindowContext = {
        containerId,
        parentContainerWidth: width,
        currentPage,
        nodeRef,
        setPagesAmount,
    }

    return (
        <ProgressWindowContext.Provider value={context}>
            <PrivateProgressWindowContext.Provider value={privateContext}>
                {children}
            </PrivateProgressWindowContext.Provider>
        </ProgressWindowContext.Provider>
    )
}

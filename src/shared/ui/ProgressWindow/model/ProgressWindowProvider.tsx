'use client'

import { useGetComponentSizes } from '@/shared/hooks/useGetComponentSizes'
import { useLatest } from '@/shared/hooks/useLatest'
import { useCallback, useLayoutEffect, useState } from 'react'

import {
    PrivateProgressWindowContext,
    ProgressWindowContext,
} from './ProgressWindowContext'
import type {
    ProgressWindowProviderProps,
    TPrivateProgressWindowContext,
    TProgressWindowContext,
} from './types'

export const ProgressWindowProvider = ({
    children,
    getPublicContext,
}: ProgressWindowProviderProps) => {
    const [currentPageInView, setCurrentPage] = useState(0)
    const latestCurrentPage = useLatest(currentPageInView)
    const [totalPages, setTotalPages] = useState(0)
    const { nodeRef, width } = useGetComponentSizes<HTMLDivElement>()

    const setPagesAmount = useCallback(setTotalPages, [])

    const onNext = useCallback(() => {
        // Если мы на последней странице, то отменить действие
        if (latestCurrentPage.current + 1 === totalPages) return
        setCurrentPage((p) => p + 1)
    }, [totalPages, latestCurrentPage])

    const onPrev = useCallback(() => {
        if (!latestCurrentPage.current) return
        setCurrentPage((p) => p - 1)
    }, [latestCurrentPage])

    const publicContext: TProgressWindowContext = {
        onNext,
        onPrev,
        setCurrentPage,
        currentPage: currentPageInView + 1,
        totalPages,
        isLastPage: currentPageInView + 1 === totalPages,
    }

    useLayoutEffect(() => {
        getPublicContext?.(publicContext)
        return () => getPublicContext?.(null)
    }, [])

    const privateContext: TPrivateProgressWindowContext = {
        parentContainerWidth: width,
        currentPageInView,
        containerRef: nodeRef,
        setPagesAmount,
    }

    return (
        <ProgressWindowContext.Provider value={publicContext}>
            <PrivateProgressWindowContext.Provider value={privateContext}>
                {children}
            </PrivateProgressWindowContext.Provider>
        </ProgressWindowContext.Provider>
    )
}

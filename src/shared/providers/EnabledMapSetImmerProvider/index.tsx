'use client'

import { Layout } from '@/shared/types/layout'
import { useEffect } from 'react'

/* Включает возможность иммутабельно работать с Map и Set в immer. */
export const EnabledMapSetImmerProvider = ({ children }: Layout) => {
    useEffect(() => {
        import('immer').then((module) => {
            module.enableMapSet()
        })
    }, [])

    return children
}

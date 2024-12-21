'use client'

import { useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

export interface IVirtualGridFooter {
    inViewAction?: () => any
    enabled?: boolean
}

export const Footer = (props: IVirtualGridFooter) => {
    const { inViewAction, enabled } = props
    const { isIntersecting, ref } = useIntersectionObserver({
        rootMargin: '100%',
    })

    useEffect(() => {
        if (isIntersecting && !enabled) {
            inViewAction?.()
        }
    }, [isIntersecting, inViewAction, enabled])

    return (
        <div
            style={{ border: '1px solid black', height: '20px' }}
            ref={ref}
        ></div>
    )
}

'use client'

import { getSetting } from '@/shared/ui/ProgressWindow/model/lib'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'

import { usePrivateProgressWindowContext } from '../model/hooks'
import { TProgressWindowContainer } from '../model/types'
import s from './s.module.scss'

export const ProgressWindowContainer = ({
    children,
    setting,
    className,
}: TProgressWindowContainer) => {
    const {
        setPagesAmount,
        currentPage,
        containerRef,
        parentContainerWidth: width,
    } = usePrivateProgressWindowContext()

    const [currentPosition, setCurrentPosition] = useState(0)

    useEffect(() => {
        if (!width) return
        setCurrentPosition(-(width * currentPage))
    }, [currentPage, width])

    useEffect(() => {
        setPagesAmount(children.length)
        // eslint-disable-next-line
    }, [])

    const settings = getSetting(setting)

    return (
        <div
            ref={containerRef}
            className={clsx(s['slider-wrapper'], className)}
        >
            <div
                style={{
                    transform: `translateX(${currentPosition}px)`,
                    transition: settings?.transition,
                }}
                className={clsx(s['window-container'])}
            >
                {children.map((child, i) => {
                    return (
                        <div
                            className='flex'
                            key={i}
                            ref={setTabIndexOnInputs(i, currentPage)}
                        >
                            {child}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function setTabIndexOnInputs(i: number, currentPage: number) {
    return (node: HTMLDivElement | null) => {
        if (!node) return
        const inputs = node?.querySelectorAll('input')
        if (!inputs.length) return
        if (i === currentPage) {
            inputs.forEach((input) => (input.tabIndex = 1))
        } else {
            inputs.forEach((input) => (input.tabIndex = -1))
        }
    }
}

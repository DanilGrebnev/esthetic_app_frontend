'use client'

import {
    getSetting,
    setTabIndexOnInputs,
} from '@/shared/ui/ProgressWindow/model/lib'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'

import { usePrivateProgressWindowContext } from '../model/hooks'
import { TProgressWindowContainer } from '../model/types'
import { _ProgressWindowTabWrapper } from './_ProgressWindowTabWrapper'
import s from './s.module.scss'

export const ProgressWindowContainer = ({
    children,
    setting,
    className,
}: TProgressWindowContainer) => {
    const {
        setPagesAmount,
        currentPageInView,
        containerRef,
        parentContainerWidth: width,
    } = usePrivateProgressWindowContext()

    const [currentPosition, setCurrentPosition] = useState(0)

    useEffect(() => {
        if (!width) return
        setCurrentPosition(-(width * currentPageInView))
    }, [currentPageInView, width])

    useEffect(() => {
        setPagesAmount(children.length)
        // eslint-disable-next-line
    }, [])

    const settings = getSetting(setting)

    return (
        <div
            ref={containerRef}
            className={clsx(s.slider_wrapper, className)}
        >
            <div
                style={{
                    transform: `translateX(${currentPosition}px)`,
                    transition: settings?.transition,
                }}
                className={clsx(s.window_container)}
            >
                {children.map((child, i) => {
                    const disabledTab = i !== currentPageInView

                    return (
                        <_ProgressWindowTabWrapper
                            key={i}
                            ref={(node) =>
                                setTabIndexOnInputs(node, disabledTab)
                            }
                        >
                            {child}
                        </_ProgressWindowTabWrapper>
                    )
                })}
            </div>
        </div>
    )
}

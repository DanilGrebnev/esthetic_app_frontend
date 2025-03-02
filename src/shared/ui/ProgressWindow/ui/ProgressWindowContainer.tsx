'use client'

import { getSetting, setTabIndex } from '@/shared/ui/ProgressWindow/model/lib'
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

    /**  Фильтруем false, null, undefined,
     * чтобы длинна children была корректной */
    const filteredChildren = children.filter((child) => !!child)

    /* Обновляем количество страниц при 
    изменении количества чилдренов */
    useEffect(() => {
        setPagesAmount(filteredChildren.length)
    }, [filteredChildren])

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
                className={s.window_container}
            >
                {filteredChildren.map((child, i) => {
                    const disabledTab = i !== currentPageInView

                    return (
                        <_ProgressWindowTabWrapper
                            key={i}
                            ref={(node) => setTabIndex(node, disabledTab)}
                        >
                            {child}
                        </_ProgressWindowTabWrapper>
                    )
                })}
            </div>
        </div>
    )
}

ProgressWindowContainer.displayName = 'ProgressWindowContainer'

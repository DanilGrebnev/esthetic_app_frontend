import { getSetting } from '@/shared/ui/ProgressWindow/model/lib'
import { clsx } from 'clsx'
import { type FC, useEffect, useState } from 'react'

import { usePrivateProgressWindowContext } from '../model/hooks'
import { TProgressWindowContainer } from '../model/types'
import s from './s.module.scss'

export const ProgressWindowContainer: FC<TProgressWindowContainer> = ({
    children,
    setting,
    className,
}) => {
    const {
        containerId,
        setPagesAmount,
        currentPage,
        nodeRef,
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
        <div className={clsx(s['progress-window'], className)}>
            <div
                ref={nodeRef}
                className={s['slider-wrapper']}
            >
                <div
                    id={containerId}
                    style={{
                        transform: `translateX(${currentPosition}px)`,
                        transition: settings?.transition,
                    }}
                    className={clsx(s['window-container'])}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

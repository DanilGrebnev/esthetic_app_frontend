import { useCallback, useEffect, useRef, useState } from 'react'

import { throttle } from '../utils/throttle'

type TScrollDirection = 'up' | 'down' | null

/**
 * Показывает направление скролла
 */
export const useScrollDirection = (enabled: boolean, throttleMs?: number) => {
    const [scrollDirection, setScrollDirection] =
        useState<TScrollDirection>(null)
    const [isEnabled, setIsEnabled] = useState(enabled)

    const resetScrollDirection = useCallback(() => {
        setScrollDirection(null)
    }, [])

    const setEnabled = useCallback(
        (enabled: boolean) => {
            if (!enabled) {
                resetScrollDirection()
            }
            setIsEnabled(enabled)
        },
        [resetScrollDirection],
    )

    const oldYScroll = useRef(window.scrollY)

    const onScroll = useCallback(
        throttle(() => {
            if (oldYScroll.current < window.scrollY) {
                setScrollDirection('down')
            } else {
                setScrollDirection('up')
            }
            oldYScroll.current = window.scrollY
        }, throttleMs ?? 500),
        [throttleMs],
    )

    useEffect(() => {
        if (!isEnabled) return resetScrollDirection()
        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
            resetScrollDirection()
        }
    }, [isEnabled, resetScrollDirection, onScroll])

    return { scrollDirection, resetScrollDirection, setEnabled }
}

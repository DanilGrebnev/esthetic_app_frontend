import { useCallback, useEffect, useRef, useState } from 'react'

import { throttle } from '../utils/throttle'

/**
 * Показывает направление скролла
 */
export const useScrollDirection = (enabled: boolean, throttleMs?: number) => {
    type TScrollDirection = 'up' | 'down' | null

    const [scrollDirection, setScrollDirection] =
        useState<TScrollDirection>(null)

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
        if (!enabled) return setScrollDirection(null)
        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
            setScrollDirection(null)
        }
    }, [enabled, onScroll])

    return { scrollDirection }
}

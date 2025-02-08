import { useCallback, useEffect, useRef, useState } from 'react'

import { throttle } from '../utils/throttle'

export const useScrollDirection = (enabled: boolean) => {
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
        }, 500),
        [],
    )

    useEffect(() => {
        if (!enabled) return
        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [enabled, onScroll])

    return { scrollDirection }
}

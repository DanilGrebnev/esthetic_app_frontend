import { useCallback, useEffect, useRef, useState } from 'react'

import { throttle } from '../utils/throttle'

export const useScrollDirection = () => {
    type TScrollDirection = 'up' | 'down'

    const [scrollDirection, setScrollDirection] =
        useState<TScrollDirection>('up')

    const oldYScroll = useRef(window.scrollY)

    useEffect(() => {
        const onScroll = throttle(() => {
            if (oldYScroll.current < window.scrollY) {
                setScrollDirection('down')
            } else {
                setScrollDirection('up')
            }
            oldYScroll.current = window.scrollY
        }, 500)

        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return { scrollDirection }
}

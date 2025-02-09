import { CircleButton } from '@/shared/ui/CircleButton'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { type RefObject, memo } from 'react'
import { type VirtuosoGridHandle } from 'react-virtuoso'

import s from './to-top-btn.module.scss'

interface TToTopBtnProps {
    virtuoso: RefObject<VirtuosoGridHandle | null>
    show?: boolean
}

export const ToTopBtn = memo((props: TToTopBtnProps) => {
    const { virtuoso, show = true } = props

    const initial = { opacity: 0, bottom: -20 }
    const animate = { opacity: 1, bottom: 20 }

    return (
        <AnimatePresence initial={false}>
            {show ? (
                <m.span
                    className={s.animate_block}
                    initial={initial}
                    animate={animate}
                    exit={initial}
                    key='ToTopBtn'
                >
                    <CircleButton
                        onClick={() => {
                            virtuoso.current?.scrollToIndex({
                                index: 0,
                                behavior: 'smooth',
                            })
                        }}
                        icon='arrow'
                    />
                </m.span>
            ) : null}
        </AnimatePresence>
    )
})

ToTopBtn.displayName = 'ToTopBtn'

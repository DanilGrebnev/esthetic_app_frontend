'use client'

import { clsx } from 'clsx'
import { m } from 'framer-motion'
import {
    Children,
    ReactNode,
    forwardRef,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react'

import s from './s.module.scss'

interface DialogProps {
    children?: ReactNode | ReactNode[]
    open?: boolean
}

export const _TilesDialogContainer = memo(
    forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
        const { children, open } = props
        const arrayChildren = Children.toArray(children)

        const variantsRef = useRef({
            open: { scale: 1 },
            closed: { scale: 0 },
        })

        return (
            <m.div
                animate={open ? 'open' : 'closed'}
                variants={variantsRef.current}
                transition={{ duration: 0.1 }}
                ref={ref}
                className={s.dialog}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={s['dialog-wrapper']}>{arrayChildren}</div>
            </m.div>
        )
    }),
)

_TilesDialogContainer.displayName = '_TilesDialogContainer'

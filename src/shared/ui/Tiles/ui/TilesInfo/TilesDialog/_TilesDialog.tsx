'use client'

import { clsx } from 'clsx'
import {
    Children,
    ReactNode,
    forwardRef,
    memo,
    useEffect,
    useState,
} from 'react'

import s from './s.module.scss'

interface DialogProps {
    children?: ReactNode | ReactNode[]
}

export const _TilesDialogContainer = memo(
    forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
        const { children } = props
        const arrayChildren = Children.toArray(children)

        const [open, setOpen] = useState(false)

        useEffect(() => {
            setOpen(true)
            return () => setOpen(false)
        }, [])

        return (
            <div
                ref={ref}
                className={clsx(s.dialog, { [s.open]: open })}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={s['dialog-wrapper']}>{arrayChildren}</div>
            </div>
        )
    }),
)

_TilesDialogContainer.displayName = '_TilesDialogContainer'

'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import { clsx } from 'clsx'
import {
    Children,
    type ReactNode,
    forwardRef,
    memo,
    useEffect,
    useState,
} from 'react'

import s from './SlidingMenu.module.scss'

interface SlidingMenuProps {
    children?: ReactNode
    icon: ReactNode
    onOpen?: (open: boolean) => void
}

export const SlidingMenu = memo(
    forwardRef<HTMLDivElement, SlidingMenuProps>((props, ref) => {
        const { children, icon, onOpen } = props

        const [open, setOpen] = useState(false)

        useEffect(() => {
            onOpen?.(open)
        }, [open])

        const { elementRef } = useOutsideClick({
            attached: open,
            handler: () => setOpen(false),
        })

        const combinedRef = useCombinedRef(ref, elementRef)

        const toggleOpen = () => {
            setOpen((p) => !p)
        }

        return (
            <div
                ref={combinedRef}
                className={s.wrapper}
                onClick={toggleOpen}
            >
                {icon}
                <div className={clsx(s['items-wrapper'], { [s.open]: open })}>
                    {Children?.map(children, (child) => (
                        <div onClick={(e) => e.stopPropagation()}>{child}</div>
                    ))}
                </div>
            </div>
        )
    }),
)

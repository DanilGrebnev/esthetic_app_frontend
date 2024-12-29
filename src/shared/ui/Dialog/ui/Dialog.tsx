import { useDialog } from '@/shared/ui/Dialog/lib/hooks'
import { VariantProps, cva } from 'class-variance-authority'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { type ReactNode } from 'react'

import s from './Dialog.module.scss'

type DialogProps = VariantProps<typeof dialog>

interface BaseDialog {
    variant: DialogProps['variant']
    children?: ReactNode
    open?: boolean
    className?: string
    closeTimeout?: number
}

const dialog = cva(s.dialog, {
    variants: {
        state: {
            open: s.open,
        },
        variant: {
            warning: s.warning,
            info: s.info,
            success: s.success,
        },
    },
    defaultVariants: {
        variant: 'success',
        state: null,
    },
})

export const Dialog = (props: BaseDialog) => {
    const { variant, className, open, children, closeTimeout } = props
    const { isOpen } = useDialog({ open, closeTimeout })

    const variants = {
        open: { scale: 1 },
        closed: { scale: 0 },
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <m.div
                    key='dialog'
                    initial={{
                        ...variants.closed,
                    }}
                    animate={isOpen ? 'open' : 'closed'}
                    variants={variants}
                    exit={{ ...variants.closed }}
                    className={dialog({
                        variant,
                        state: isOpen ? 'open' : null,
                        className,
                    })}
                >
                    <div className={s.wrapper}>{children}</div>
                </m.div>
            )}
        </AnimatePresence>
    )
}

Dialog.displayName = 'Dialog'

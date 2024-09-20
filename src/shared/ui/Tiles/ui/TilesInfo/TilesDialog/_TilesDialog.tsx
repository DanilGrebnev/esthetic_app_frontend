import { Children, ReactNode, forwardRef, memo } from 'react'

import s from './s.module.scss'

interface DialogProps {
    children?: ReactNode | ReactNode[]
}

export const _TilesDialogContainer = memo(
    forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
        const { children } = props
        const arrayChildren = Children.toArray(children)

        return (
            <div
                ref={ref}
                className={s.dialog}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={s['dialog-wrapper']}>{arrayChildren}</div>
            </div>
        )
    }),
)

_TilesDialogContainer.displayName = '_TilesDialogContainer'

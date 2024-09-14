import DotMenuIcon from '@/shared/assets/dot-menu.svg'
import { clsx } from 'clsx'
import { ComponentPropsWithRef, forwardRef } from 'react'

import s from './s.module.scss'

interface DotMenuProps extends ComponentPropsWithRef<'svg'> {}

export const DotMenu = forwardRef<SVGElement, DotMenuProps>(
    ({ className, ...otherProps }, ref) => (
        <DotMenuIcon
            ref={ref}
            {...otherProps}
            className={clsx(s['dot-menu'], className)}
        />
    ),
)

DotMenu.displayName = 'DotMenu'

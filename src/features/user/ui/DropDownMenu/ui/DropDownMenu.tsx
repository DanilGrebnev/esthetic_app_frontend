'use client'

import { NotAuthorized } from '@/features/user/ui/DropDownMenu/ui/NotAuthorized'
import { clsx } from 'clsx'
import { type FC } from 'react'

import s from './DropDownMenu.module.scss'
import { SuccessAuth } from './SuccessAuth'

interface DropDownMenuProps {
    className?: string
    auth?: boolean
    userId?: string
}

export const DropDownMenu: FC<DropDownMenuProps> = (props) => {
    const { className, auth, userId } = props

    return (
        <div className={clsx(s['drop-down'], className)}>
            <div className={s['drop-down-wrapper']}>
                {auth ? <SuccessAuth userId={userId} /> : <NotAuthorized />}
            </div>
        </div>
    )
}

DropDownMenu.displayName = 'DropDownMenu'

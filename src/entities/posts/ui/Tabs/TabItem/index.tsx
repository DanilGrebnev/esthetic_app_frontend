'use client'

import clsx from 'clsx'
import { type FC, MouseEventHandler, memo } from 'react'

import s from './s.module.sass'

interface ITabItem {
    label: string
    onClick: (label: string) => void
    active: boolean
}

export const TabItem: FC<ITabItem> = memo((props) => {
    const { active, label, onClick } = props

    return (
        <li
            className={clsx(s['tab-item'], {
                [s.active]: active,
            })}
            onClick={() => onClick(label)}
        >
            <div
                className={s.block}
                style={{
                    aspectRatio: label,
                }}
            ></div>
            <p>{label}</p>
        </li>
    )
})

TabItem.displayName = 'TabItem'

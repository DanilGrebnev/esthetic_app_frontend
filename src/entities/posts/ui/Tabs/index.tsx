'use client'

import clsx from 'clsx'
import { type FC, ReactNode, useCallback, useEffect, useState } from 'react'

import { TabItem } from './TabItem'
import s from './s.module.sass'

interface ITabs {
    onChange?: (currentTab: string) => void
    className?: string
}
const tabs = ['9/16', '2/3', '3/4', '4/5', '1/1'] as const

export const Tabs: FC<ITabs> = (props) => {
    const { onChange, className } = props
    const [currentTab, setCurrentTab] = useState<string>(tabs[0])

    const changeActiveTab = useCallback((label: string) => {
        setCurrentTab(label)
    }, [])

    useEffect(() => {
        onChange?.(currentTab)
    }, [currentTab, onChange])

    return (
        <nav className={clsx(s['tabs-wrapper'], className)}>
            <ul className={s['tabs-list']}>
                {tabs.map((label) => {
                    return (
                        <TabItem
                            key={label}
                            label={label}
                            active={label === currentTab}
                            onClick={changeActiveTab}
                        />
                    )
                })}
            </ul>
        </nav>
    )
}

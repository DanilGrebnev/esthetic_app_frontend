'use client'

import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'

import { TabItem } from './TabItem'
import { TabsRender } from './TabsRender'
import s from './s.module.scss'

interface ITabs {
    onChange?: (currentTab: string) => void
    className?: string
    name?: string
}

export const Tabs = (props: ITabs) => {
    const { onChange: onChangeFromProps, className, name } = props
    const [aspectRatio, setAspectRatio] = useState<string>(
        aspectRatioVariants[0],
    )

    const changeActiveTab = useCallback((label: string) => {
        setAspectRatio(label)
    }, [])

    useEffect(() => {
        onChangeFromProps?.(aspectRatio)
    }, [aspectRatio, onChangeFromProps])

    return (
        <nav className={clsx(s['tabs-wrapper'], className)}>
            <input
                name={name}
                value={aspectRatio}
                type='hidden'
            />
            <TabsRender data={aspectRatioVariants}>
                {(label) => (
                    <TabItem
                        key={label}
                        label={label}
                        active={label === aspectRatio}
                        onClick={changeActiveTab}
                    />
                )}
            </TabsRender>
        </nav>
    )
}

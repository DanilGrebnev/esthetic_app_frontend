import clsx from 'clsx'
import React from 'react'

import { AppliedTags, GetTagType, TFontSize, TWeight } from './model/types'
import s from './text.module.scss'

type TextProps<Element extends AppliedTags> = {
    element?: Element
    size?: TFontSize
    weight?: TWeight
} & GetTagType<Element>

export const Text = <T extends AppliedTags = 'p'>(props: TextProps<T>) => {
    const {
        element = 'p',
        children,
        className,
        size = 'font-300',
        ref,
        style,
        weight = 'normal',
        ...otherProps
    } = props
    const Tag = element as any

    return (
        <Tag
            ref={ref}
            className={clsx(s.text, s[weight], className)}
            style={{ fontSize: `var(--${size})`, ...style }}
            {...otherProps}
        >
            {children}
        </Tag>
    )
}

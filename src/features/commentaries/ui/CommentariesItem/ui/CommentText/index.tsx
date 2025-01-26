'use client'

import clsx from 'clsx'
import { ReactNode, memo } from 'react'

import s from './s.module.scss'

interface CommentTextProps {
    children: ReactNode
}
export const CommentText = memo((props: CommentTextProps) => {
    const { children } = props

    return <div className={clsx(s.text, 'main-font-family')}>{children}</div>
})

CommentText.displayName = 'CommentText'

'use client'

import { type CSSProperties, memo } from 'react'

import { usePrivateProgressWindowContext } from '../model/hooks'
import { ProgressWindowTabProps } from '../model/types'

export const ProgressWindowTab = memo((props: ProgressWindowTabProps) => {
    const { children, className, style } = props
    const { parentContainerWidth } = usePrivateProgressWindowContext()

    if (!children || !parentContainerWidth) return

    return (
        <div
            style={createStyle({ parentContainerWidth, style })}
            className={className}
        >
            {children}
        </div>
    )
})

ProgressWindowTab.displayName = 'ProgressWindowTab'

function createStyle({
    parentContainerWidth,
    style,
}: {
    parentContainerWidth: number
    style?: CSSProperties
}) {
    const parentWidth = parentContainerWidth + 'px'

    return {
        minWidth: parentWidth,
        maxWidth: parentWidth,
        ...style,
    }
}

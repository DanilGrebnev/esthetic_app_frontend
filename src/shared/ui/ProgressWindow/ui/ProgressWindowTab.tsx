'use client'

import { usePrivateProgressWindowContext } from '../model/hooks'
import { ProgressWindowTabProps } from '../model/types'

export function ProgressWindowTab(props: ProgressWindowTabProps) {
    const { children, className, style } = props
    const { parentContainerWidth, currentPage } =
        usePrivateProgressWindowContext()

    if (!children || !parentContainerWidth) return

    const styles = parentContainerWidth
        ? {
              minWidth: parentContainerWidth + 'px',
              ...style,
          }
        : style

    return (
        <div
            style={styles}
            className={className}
        >
            {children}
        </div>
    )
}

ProgressWindowTab.displayName = 'ProgressWindowTab'

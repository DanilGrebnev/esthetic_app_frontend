'use client'

import { createPortal } from 'react-dom'

import { usePrivateProgressWindowContext } from '../hooks'
import { ProgressWindowTabProps } from '../types'

export const ProgressWindowTab = (props: ProgressWindowTabProps) => {
    const { children, className, style } = props
    const context = usePrivateProgressWindowContext()

    if (!context) return

    const { containerId, parentContainerWidth } = context
    const container = document.getElementById(containerId)

    if (!children || !container) return

    const styles = parentContainerWidth
        ? {
              minWidth: parentContainerWidth + 'px',
              ...style,
          }
        : style

    return (
        <>
            {createPortal(
                <div
                    className={className}
                    style={styles}
                >
                    {children}
                </div>,
                container,
            )}
        </>
    )
}

ProgressWindowTab.displayName = 'ProgressWindowTab'

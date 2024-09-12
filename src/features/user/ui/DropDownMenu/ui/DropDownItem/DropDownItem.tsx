'use client'

import { Button } from '@/shared/ui/Button'
import { type FC, ReactNode } from 'react'

interface ModalItemProps {
    children: ReactNode
    onClick?: () => void
    href?: string
}

export const DropDownItem: FC<ModalItemProps> = (props) => {
    const { children, onClick, href } = props

    return (
        <Button
            fullWidth={true}
            href={href}
            type='button'
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

DropDownItem.displayName = 'ModalItem'

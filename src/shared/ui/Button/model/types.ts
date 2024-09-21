import type { ComponentPropsWithRef } from 'react'

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
    className?: string
    active?: boolean
    activeVariant?: 'active-fill' | 'active-underline'
    heightSize?: 'full' | 'content'
    href?: string
    variant?: 'standart' | 'red' | 'silver'
    loading?: boolean
    fullWidth?: boolean
    size?: 'm' | 'l'
}

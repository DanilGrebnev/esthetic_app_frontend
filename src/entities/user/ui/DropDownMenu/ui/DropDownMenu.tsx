'use client'

import { Box } from '@/shared/ui/Box'
import { clsx } from 'clsx'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import dynamic from 'next/dynamic'

import s from './DropDownMenu.module.scss'

const NotAuthorized = dynamic(() => import('./NotAuthorized'))
const SuccessAuth = dynamic(() => import('./Authorized'))

interface DropDownMenuProps {
    className?: string
    auth?: boolean
    userId?: string
    open?: boolean
}

const variants = {
    open: { scale: 1 },
    closed: { scale: 0 },
}

export const DropDownMenu = (props: DropDownMenuProps) => {
    const { className, auth, userId, open } = props

    return (
        <AnimatePresence>
            {open && (
                <m.div
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    initial={variants.open}
                    variants={variants}
                    animate={open ? 'open' : 'closed'}
                    transition={{ duration: 0.1 }}
                    exit={variants.closed}
                    className={clsx(s.drop_down, className)}
                >
                    <Box>
                        {auth ? (
                            <SuccessAuth userId={userId} />
                        ) : (
                            <NotAuthorized />
                        )}
                    </Box>
                </m.div>
            )}
        </AnimatePresence>
    )
}

DropDownMenu.displayName = 'DropDownMenu'

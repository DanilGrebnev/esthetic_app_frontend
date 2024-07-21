'use client'

import CrossIcon from '@/shared/assets/cross.svg'
import { IconButton, StyledEngineProvider } from '@mui/material'
import clsx from 'clsx'
import { forwardRef, useRef } from 'react'

import s from './s.module.sass'

type DeleteContentBtnProps = Parameters<typeof IconButton>[0]

export const DeleteContentBtn = forwardRef<
    HTMLButtonElement,
    DeleteContentBtnProps
>((props, ref) => {
    const { className, ...other } = props

    return (
        <StyledEngineProvider injectFirst>
            <IconButton ref={ref} className={clsx(s.btn, className)} {...other}>
                <CrossIcon className={s.icon} />
            </IconButton>
        </StyledEngineProvider>
    )
})

DeleteContentBtn.displayName = 'UploadContentBtn'

import { TextField } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { clsx } from 'clsx'
import { forwardRef, memo } from 'react'

import s from './s.module.scss'

export const Input = memo(
    forwardRef<HTMLInputElement, Parameters<typeof TextField>[0]>(
        (props, ref) => {
            const { variant, className, disabled, ...other } = props

            return (
                <StyledEngineProvider injectFirst>
                    <TextField
                        inputRef={ref}
                        disabled={disabled}
                        className={clsx(
                            s.input,
                            { 'input-disabled': disabled },
                            className,
                        )}
                        variant='filled'
                        {...other}
                    />
                </StyledEngineProvider>
            )
        },
    ),
)

Input.displayName = 'CustomInput'

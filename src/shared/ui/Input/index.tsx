import TextField from '@mui/material/TextField'
import { StyledEngineProvider } from '@mui/material/styles'
import { forwardRef } from 'react'

import s from './s.module.sass'

type CustomInputProps = Parameters<typeof TextField>[0]

export const Input = forwardRef<HTMLInputElement, CustomInputProps>(
    (props, ref) => {
        return (
            <StyledEngineProvider injectFirst>
                <TextField className={s.input} ref={ref} {...props} />
            </StyledEngineProvider>
        )
    },
)

Input.displayName = 'CustomInput'

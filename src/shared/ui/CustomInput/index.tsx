import TextField from '@mui/material/TextField'
import { forwardRef } from 'react'

type CustomInputProps = Parameters<typeof TextField>[0]

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
    (props, ref) => {
        return <TextField ref={ref} {...props} />
    },
)

CustomInput.displayName = 'CustomInput'

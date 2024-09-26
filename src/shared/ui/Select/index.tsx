'use client'

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
} from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { clsx } from 'clsx'
import { type FC, memo, useId, useState } from 'react'

import s from './s.module.scss'

export type SelectType = { name: string; value: string }
type MenuItem = SelectType

type BasicSelectProps = Omit<
    Parameters<typeof Select>[0],
    'children' | 'onChange'
> & {
    onChange?: ({ name, value }: { name: string; value: string }) => void
    children: MenuItem[] | []
    placeholder?: string
}

const BasicSelect: FC<BasicSelectProps> = memo((props) => {
    const {
        label,
        children = [],
        placeholder,
        variant,
        onChange: onChangeProps,
        disabled,
        ...other
    } = props

    const id = useId()
    const [value, setValue] = useState('')

    const handleChange = (e: SelectChangeEvent<unknown>) => {
        setValue(e.target.value as string)
        onChangeProps?.({ name: e.target.name, value: String(e.target.value) })
    }

    return (
        <StyledEngineProvider injectFirst>
            <FormControl
                className={clsx(s.select, { 'input-disabled': disabled })}
                variant='filled'
                fullWidth
            >
                <InputLabel id={id}>{label}</InputLabel>
                <Select
                    labelId={id}
                    id={id}
                    value={value}
                    label={label}
                    onChange={handleChange}
                    {...other}
                >
                    {placeholder && (
                        <MenuItem
                            disabled
                            value=''
                        >
                            <em>{placeholder}</em>
                        </MenuItem>
                    )}
                    {children?.map(({ name, value }) => {
                        return (
                            <MenuItem
                                key={name}
                                value={value}
                            >
                                {name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </StyledEngineProvider>
    )
})

BasicSelect.displayName = 'BasicSelect'

export { BasicSelect as Select }

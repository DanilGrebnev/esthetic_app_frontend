import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
} from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { type FC, useId, useState } from 'react'

import s from './s.module.sass'

type MenuItem = { name: string; value: string; checked?: boolean }

type BasicSelectProps = Omit<
    Parameters<typeof Select>[0],
    'children' | 'onChange'
> & {
    onChange?: (value: string) => void

    children?: MenuItem[]
}

const BasicSelect: FC<BasicSelectProps> = (props) => {
    const { label, children, onChange: onChangeProps, ...other } = props

    const id = useId()
    const [value, setValue] = useState('')

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        setValue(event.target.value as string)
        onChangeProps?.(event.target.value + '')
    }

    return (
        <StyledEngineProvider injectFirst>
            <FormControl className={s.select} fullWidth>
                <InputLabel id={id}>{label}</InputLabel>
                <Select
                    labelId={id}
                    id={id}
                    value={value}
                    label={label}
                    onChange={handleChange}
                    {...other}
                >
                    {children?.map(({ name, value, checked }) => {
                        return (
                            <MenuItem key={name} value={value}>
                                {name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </StyledEngineProvider>
    )
}

export { BasicSelect as Select }

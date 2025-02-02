import { HTMLAttributes, Ref } from 'react'

import { LeftSideWithIcon } from './LeftSideWithIcon'
import s from './input.module.scss'

interface InputProps extends HTMLAttributes<HTMLInputElement> {
    ref?: Ref<HTMLDivElement>
}
export const Input = (props: InputProps) => {
    const { onFocus, onChange, ref } = props

    return (
        <div
            ref={ref}
            className={s.input_wrapper}
        >
            <LeftSideWithIcon />

            <input
                onFocus={onFocus}
                placeholder='Поиск'
                className={s.input}
                onChange={onChange}
            />
        </div>
    )
}

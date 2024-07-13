'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import clsx from 'clsx'
import {
    ChangeEvent,
    FocusEvent,
    type HTMLAttributes,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import { forwardRef } from 'react'

import s from './s.module.sass'

interface InputProps extends HTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { className, onFocus, onChange, ...other } = props

    const [focus, setFocus] = useState(false)
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const combinedRefs = useCombinedRef(ref, inputRef)

    const onBlur = () => {
        setFocus(false)
    }

    const onFocused = (e: FocusEvent<HTMLInputElement, Element>) => {
        onFocus?.(e)
        setFocus(true)
    }

    const onChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        onChange?.(e)
    }

    return (
        <div className={s.wrapper}>
            <label
                className={clsx(s.label, {
                    [s.active]: focus || value,
                })}
            >
                label
            </label>
            <input
                ref={combinedRefs}
                onChange={onChanged}
                onFocus={onFocused}
                onBlur={onBlur}
                className={s.input}
                {...other}
            />
        </div>
    )
})

Input.displayName = 'Input'

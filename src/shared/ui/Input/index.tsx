'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import clsx from 'clsx'
import { InputHTMLAttributes, useId } from 'react'
import {
    type ChangeEvent,
    type FocusEvent,
    useEffect,
    useRef,
    useState,
} from 'react'
import { forwardRef } from 'react'

import s from './s.module.sass'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string | null
    label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        className,
        onFocus,
        onChange,
        label,
        error: errorFromProps,
        id,
        ...other
    } = props
    const htmlForId = useId()

    const [focus, setFocus] = useState(false)
    const [value, setValue] = useState('')
    const [error, setIsError] = useState<string | null>(null)
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

    useEffect(() => {
        if (!errorFromProps) {
            setIsError(null)
            return
        }
        setIsError(errorFromProps)
    }, [errorFromProps])

    return (
        <div className={clsx(s.wrapper, s.disabled)}>
            {label && (
                <label
                    htmlFor={htmlForId}
                    className={clsx(s.label, {
                        [s.focus]: focus,
                        [s.notEmpty]: value,
                        [s.error]: error,
                        [s.disabled]: props.disabled,
                    })}
                >
                    {label}
                </label>
            )}
            <input
                id={clsx(htmlForId, id)}
                ref={combinedRefs}
                onChange={onChanged}
                onFocus={onFocused}
                onBlur={onBlur}
                className={clsx(s.input, {
                    [s.error]: error,
                    [s.disabled]: props.disabled,
                    [s.focus]: focus,
                })}
                {...other}
            />
        </div>
    )
})

Input.displayName = 'Input'

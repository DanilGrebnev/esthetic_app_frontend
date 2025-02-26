import clsx from 'clsx'
import { nanoid } from 'nanoid'
import {
    ChangeEvent,
    Dispatch,
    KeyboardEvent,
    Ref,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react'

import { focusNextElement, focusPrevElement } from '../lib'
import { TCells } from '../type'
import s from './cell.module.scss'

interface CellProps {
    className?: string
    focus?: boolean
    ref?: Ref<HTMLInputElement>
    position: number
    onChange?: (value: string) => void
    setCells: Dispatch<SetStateAction<TCells[]>>
}

export const Cell = (props: CellProps) => {
    const { className, focus, setCells, onChange, position } = props
    const [value, setValue] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!focus) return
        inputRef.current?.focus()
    }, [focus])

    const onChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value
        onChange?.(v)
        setValue(v)
    }

    const onKeyDownCb = (e: KeyboardEvent<HTMLInputElement>) => {
        const key = e.key
        // Если нажимает кнопку backspace
        if (key === 'Backspace') {
            setValue('')
            return
        }

        if (e.key === 'ArrowLeft') {
            setCells((p) => focusPrevElement(p, position))
            return
        }
    }

    useEffect(() => {
        if (value.length === 1) {
            setCells((p) => focusNextElement(p, position))
        }
    }, [value])

    const onKeyUpCb = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowRight') {
            setCells((p) => focusNextElement(p, position))
        }
    }

    return (
        <input
            autoComplete={'off'}
            // autoComplete='new-password'
            name={nanoid()}
            ref={inputRef}
            value={value}
            maxLength={1}
            type='text'
            onKeyUp={onKeyUpCb}
            onKeyDown={onKeyDownCb}
            onChange={onChanges}
            className={clsx(s.cell, className)}
        />
    )
}

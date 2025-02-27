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
} from 'react'

import { focusNextElement, focusPrevElement } from '../lib'
import { TCells } from '../type'
import s from './cell.module.scss'

interface CellProps {
    className?: string
    focus?: boolean
    ref?: Ref<HTMLInputElement>
    position: number
    value: string
    onChange?: (value: string) => void
    setCellsStore: Dispatch<SetStateAction<TCells[]>>
}

export const Cell = (props: CellProps) => {
    const { className, focus, value, setCellsStore, onChange, position } = props

    const inputRef = useRef<HTMLInputElement>(null)

    /* Изменяем focus в store на нужной ячейке */
    const onFocus = () => {
        setCellsStore((p) =>
            p.map((cell) => {
                if (cell.position === position) {
                    cell.focus = true
                } else {
                    cell.focus = false
                }
                return cell
            }),
        )
    }

    // Установка значения в store
    const setValue = (value: string) => {
        setCellsStore((p) =>
            p.map((cell) => {
                /* Используем position в качестве 
                уникального идентификатора */
                if (cell.position === position) {
                    cell.value = value
                }
                return cell
            }),
        )
    }

    const onChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        // Берем последний символ из строки
        const v = [...value].at(-1) ?? ''
        onChange?.(v)
        setValue(v)
    }

    const onKeyDownCb = (e: KeyboardEvent<HTMLInputElement>) => {
        const key = e.key
        // Удаляем значение при нажатии Backspace
        if (key === 'Backspace') {
            setValue('')
            return
        }

        // Смещаем фокус назад при нажатии стрелочки влево
        if (e.key === 'ArrowLeft') {
            setCellsStore((p) => focusPrevElement(p, position))
            return
        }
    }
    // Смещае фокус далее при нажатии стрелочки вправо
    const onKeyUpCb = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowRight') {
            setCellsStore((p) => focusNextElement(p, position))
        }
    }

    // Устанавливаем focus на элементе
    useEffect(() => {
        if (!focus) return
        inputRef.current?.focus()
    }, [focus])

    // Смещаем фокус дальше при изменении значения
    useEffect(() => {
        if (value.length === 1) {
            setCellsStore((p) => focusNextElement(p, position))
        }
    }, [value])

    return (
        <input
            onFocus={onFocus}
            // Пытаемся отключить autocomplete (не работает в edge)
            autoComplete='off'
            // Пытаемся отключить автозапоминание браузером поля
            name={nanoid()}
            ref={inputRef}
            value={value}
            type='text'
            onKeyUp={onKeyUpCb}
            onKeyDown={onKeyDownCb}
            onChange={onChanges}
            className={clsx(s.cell, className)}
        />
    )
}

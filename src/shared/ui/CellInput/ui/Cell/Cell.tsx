import {
    type ChangeEvent,
    type Dispatch,
    type KeyboardEvent,
    type Ref,
    type SetStateAction,
    memo,
    useEffect,
    useRef,
} from 'react'
import { useId } from 'react'

import { focusNextElement, focusPrevElement } from '../../model/lib'
import { TCells } from '../../model/types'
import s from './Cell.module.scss'

interface CellProps {
    focus?: boolean
    ref?: Ref<HTMLInputElement>
    position: number
    value: string
    onChangeEvent: () => void
    setCellsStore: Dispatch<SetStateAction<TCells[]>>
}

export const Cell = memo((props: CellProps) => {
    const { setCellsStore, onChangeEvent, focus, value, position } = props
    const randomId = useId()

    /* Изменяем focus в store на нужной ячейке */
    const onFocus = () => {
        setCellsStore((p) =>
            p.map((cell) => {
                if (cell.position === position) {
                    cell.focus = true
                } else {
                    // Сбрасываем фокус у всех остальных ячеек
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

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log({ 'e.target.value': e.target.value })
        // Берем последний символ из строки
        const v = [...e.target.value].reverse().at(-1) ?? ''
        console.log({ v })
        setValue(v)
        // Реагируем на изменение value
        onChangeEvent()
    }

    const onKeyDownCb = (e: KeyboardEvent<HTMLInputElement>) => {
        const key = e.key
        // Удаляем значение при нажатии Backspace
        if (key === 'Backspace') {
            setValue('')
            // Реагируем на изменение value
            onChangeEvent()
            return
        }

        // // Смещаем фокус назад при нажатии стрелочки влево
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

    // Смещаем фокус дальше при изменении значения
    useEffect(() => {
        if (value.length === 1) {
            setCellsStore((p) => focusNextElement(p, position))
        }
    }, [value, position, setCellsStore])

    return (
        <input
            type='text'
            // Пытаемся отключить autocomplete (не работает в edge)
            autoComplete='off'
            // Пытаемся отключить автозапоминание браузером поля
            name={randomId}
            ref={(el) => {
                if (focus) el?.focus()
            }}
            value={value}
            onFocus={onFocus}
            onKeyUp={onKeyUpCb}
            onKeyDown={onKeyDownCb}
            onChange={onChange}
            className={s.cell}
        />
    )
})

Cell.displayName = 'Cell'

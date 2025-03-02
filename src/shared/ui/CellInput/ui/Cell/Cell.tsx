import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import {
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
    onChangeEvent: (value: number | string, position: number) => void
    setCellsStore: Dispatch<SetStateAction<TCells[]>>
    validate?: 'number' | 'word' | RegExp
}

export const Cell = memo((props: CellProps) => {
    const {
        setCellsStore,
        onChangeEvent,
        validate = 'number',
        focus,
        value,
        position,
        ref,
    } = props
    const randomId = useId()

    const inputRef = useRef<HTMLInputElement>(null)
    const combinedInputRef = useCombinedRef<HTMLInputElement>(inputRef, ref)

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

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const key = e.key
        console.log(key)
        /* Используем регулярное выражение, чтобы получать символы строки или числа. */
        let regExp
        /* Т.к. буква или цифра - это 1 символ, то мы можем отлавить нажатие клавиши,
        состоящей из 1 символа */
        if (validate === 'number') {
            regExp = /^\d$/
        } else if (validate === 'word') {
            regExp = /^[a-zA-Zа-яА-Я]$/
        } else {
            regExp = validate
        }

        const symbol = regExp?.exec(key)?.[0]

        // Если нажатие было на клавишу с цифрой или буквой
        if (symbol) {
            setValue(symbol)
            // Реагируем на изменение value
            onChangeEvent(symbol, position)
        }

        // Удаляем значение при нажатии Backspace
        if (key === 'Backspace') {
            setValue('')
            // Реагируем на очистку value ячейки
            onChangeEvent('', position)
            return
        }

        // Смещаем фокус назад при нажатии стрелочки влево
        if (e.key === 'ArrowLeft') {
            setCellsStore((p) => focusPrevElement(p, position))
            return
        }
    }

    // Смещае фокус далее при нажатии стрелочки вправо
    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
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

    // Устанавливаем фокус
    useEffect(() => {
        if (!focus) return
        inputRef?.current?.focus()
    }, [focus])

    return (
        <input
            type='text'
            className={s.cell}
            // Пытаемся отключить autocomplete (не работает в edge)
            autoComplete='off'
            // Пытаемся отключить автозапоминание браузером поля
            ref={combinedInputRef}
            onChange={() => {}}
            name={randomId}
            value={value}
            onFocus={onFocus}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
        />
    )
})

Cell.displayName = 'Cell'

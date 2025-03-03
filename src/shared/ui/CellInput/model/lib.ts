import { DefaultValue, TCells } from './types'

export const createCells = (
    length: number,
    defaultValue?: DefaultValue,
): TCells[] => {
    return Array.from({ length }, (_, i) => ({
        position: i,
        focus: defaultValue?.[i]?.focus ?? false,
        value: defaultValue?.[i]?.value ?? '',
    }))
}

export const focusNextElement = (cells: TCells[], position: number) => {
    /* если находимся на последней позиции
    возвращаем ячейки без изменений */
    if (position === cells.length - 1) return cells

    return cells.map((cell) => {
        /* Изменяем focus на true на
         ячейке со следующей позицией */
        if (cell.position === position + 1) {
            cell.focus = true
        } else {
            cell.focus = false
        }
        return cell
    })
}

export const focusPrevElement = (cells: TCells[], position: number) => {
    /* Если находимся на 0 позиции - возвращаем массив ячеейк
    без изменений */
    if (!position) return cells
    return cells.map((el) => {
        if (el.position === position - 1) {
            el.focus = true
        } else {
            el.focus = false
        }

        return el
    })
}
/** Возвращает регулярное выражение для получения 1 символа.
 * Если в качестве параметра передаётся регуялрное выражение,
 * то оно обязательно должно содержать ^$ в конце, чтобы брался только 1
 * символ
 * @example
 * const regExp = /^\w$/
 * or
 * const = regExp = /^[\[\]]$/
 */
export const getRegExp = (validate: 'word' | 'number' | RegExp) => {
    let regExp

    if (validate === 'number') {
        regExp = /^\d$/
    } else if (validate === 'word') {
        regExp = /^[a-zA-Zа-яА-Я]$/
    } else {
        regExp = validate
    }

    return regExp
}

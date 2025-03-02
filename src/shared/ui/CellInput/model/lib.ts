import { DefaultValue, TCells } from './types'

export const createCells = (
    length: number,
    defaultValue?: DefaultValue,
): TCells[] => {
    return new Array(length).fill('').map((_, i) => ({
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

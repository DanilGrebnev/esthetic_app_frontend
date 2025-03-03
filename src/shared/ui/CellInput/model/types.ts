import { Dispatch, SetStateAction } from 'react'

export type DefaultValue = Omit<TCells, 'position'>[]

export interface NumberInputProps {
    name?: string
    length: number
    /** Строка, либо регулярное выражение,
     * указывающее, какие значения может принимать компонент */
    validate?: 'number' | 'word' | RegExp
    /** Значение устанавливается единожды при 1 рендере */
    defaultValue?: DefaultValue
    /** Получение результата ввода в инпут.
     * Вызывайется на каждый ввод */
    getResult?: (result: string) => void
    className?: string
    /** Получение ссылки на Dispatch внутреннего состояния
     * компонента. */
    getStore?: (store: Dispatch<SetStateAction<TCells[]>>) => void
}

export interface TCells {
    position: number
    value: string
    focus: boolean
}

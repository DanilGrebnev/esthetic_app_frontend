import { Dispatch, SetStateAction } from 'react'

export interface NumberInputProps {
    length: number
    value?: TCells[]
    /** onChange, передаётся для контроля компонента снаружи. */
    onChange?: Dispatch<SetStateAction<TCells[]>>
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

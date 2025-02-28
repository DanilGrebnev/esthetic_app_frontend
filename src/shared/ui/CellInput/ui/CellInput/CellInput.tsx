'use client'

import clsx from 'clsx'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { createCells } from '../../model/lib'
import { NumberInputProps, TCells } from '../../model/types'
import { Cell } from '../Cell/Cell'
import s from './cell-input.module.scss'

export const CellInput = (props: NumberInputProps) => {
    const { length, getResult, getStore, onChange, value, className } = props
    // Ref для сбора всех значений
    const valuesRef = useRef<(string | number)[]>([])

    const [cellsStore, setCellsStore] = useState<TCells[]>(() =>
        createCells(length),
    )

    // Передаём ссылку на Dispatch внутреннего состояния
    useLayoutEffect(() => {
        getStore?.(setCellsStore)
    }, [])

    /* Реагируем только на изменение значения */
    const onChangeEvent = useCallback(
        (value: number | string, position: number) => {
            valuesRef.current[position] = value
            const result = valuesRef.current.join('')

            getResult?.(result)
        },
        [getResult],
    )

    if (value && !onChange) {
        throw new Error('onChange обязателен, если компонент контролируемый')
    }

    return (
        <div className={clsx(s.wrapper, className)}>
            {(value ?? cellsStore).map((cell, i) => {
                return (
                    <Cell
                        key={i}
                        {...cell}
                        onChangeEvent={onChangeEvent}
                        setCellsStore={onChange ?? setCellsStore}
                    />
                )
            })}
        </div>
    )
}

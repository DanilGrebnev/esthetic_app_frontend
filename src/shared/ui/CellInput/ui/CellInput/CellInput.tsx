'use client'

import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

import { createCells } from '../../model/lib'
import { NumberInputProps, TCells } from '../../model/types'
import { Cell } from '../Cell/Cell'
import s from './cell-input.module.scss'

export const CellInput = (props: NumberInputProps) => {
    const { length, getResult, getStore, defaultValue, validate, className } =
        props

    const [cellsStore, setCellsStore] = useState<TCells[]>(() =>
        createCells(length, defaultValue),
    )

    // Ref для сбора всех значений
    const valuesRef = useRef<(string | number)[]>([])

    // Передаём ссылку на Dispatch внутреннего состояния
    useEffect(() => {
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

    return (
        <div className={clsx(s.wrapper, className)}>
            {cellsStore.map((cell, i) => {
                return (
                    <Cell
                        key={i}
                        {...cell}
                        validate={validate}
                        onChangeEvent={onChangeEvent}
                        setCellsStore={setCellsStore}
                    />
                )
            })}
        </div>
    )
}

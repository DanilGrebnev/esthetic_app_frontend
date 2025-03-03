'use client'

import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

import { createCells } from '../../model/lib'
import { NumberInputProps, TCells } from '../../model/types'
import { Cell } from '../Cell/Cell'
import s from './cell-input.module.scss'

export const CellInput = (props: NumberInputProps) => {
    const {
        length,
        getResult,
        getStore,
        name,
        defaultValue,
        validate,
        className,
    } = props

    const [cellsStore, setCellsStore] = useState<TCells[]>(() =>
        createCells(length, defaultValue),
    )
    const [hiddenInputvalue, setHiddenInputValue] = useState('')

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
            setHiddenInputValue(result)
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
            <input
                value={hiddenInputvalue}
                onChange={() => {}}
                tabIndex={-1}
                type='text'
                name={name}
                hidden={true}
            />
        </div>
    )
}

'use client'

import clsx from 'clsx'
import { useCallback, useRef, useState } from 'react'

import { createCells } from '../../model/lib'
import { NumberInputProps, TCells } from '../../model/types'
import { Cell } from '../Cell/Cell'
import s from './cell-input.module.scss'

export const CellInput = (props: NumberInputProps) => {
    const { length, onChange, className } = props
    // Ref для сбора всех значений
    const valuesRef = useRef<(string | number)[]>([])

    const [cellsStore, setCellsStore] = useState<TCells[]>(() =>
        createCells(length),
    )

    /* Реагируем только на изменение value значения */
    const onChangeEvent = useCallback(
        (value: number | string, position: number) => {
            valuesRef.current[position] = value
            onChange?.(valuesRef.current.join(''))
        },
        [onChange],
    )

    return (
        <div className={clsx(s.wrapper, className)}>
            {cellsStore.map((cell, i) => {
                return (
                    <Cell
                        key={i}
                        {...cell}
                        onChangeEvent={onChangeEvent}
                        setCellsStore={setCellsStore}
                    />
                )
            })}
        </div>
    )
}

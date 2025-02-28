'use client'

import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { createCells } from '../../model/lib'
import { NumberInputProps, TCells } from '../../model/types'
import { Cell } from '../Cell/Cell'
import s from './cell-input.module.scss'

export const CellInput = (props: NumberInputProps) => {
    const { length, onChange, className } = props

    const [cellsStore, setCellsStore] = useState<TCells[]>(() =>
        createCells(length),
    )

    /* Реагируем только на изменение value значения */
    const onChangeEvent = () => {
        console.log(cellsStore)
    }

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

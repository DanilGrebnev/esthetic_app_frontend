'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { createCells } from './lib'
import s from './number-input.module.scss'
import { NumberInputProps, TCells } from './type'
import { Cell } from './ui/Cell'

export const NumberInput = (props: NumberInputProps) => {
    const { length, onChange, className } = props
    const [cellsStore, setCellsStore] = useState<TCells[]>(() =>
        createCells(length),
    )

    useEffect(() => {
        // console.clear()
        // console.log(cellsStore)
    }, [cellsStore])

    return (
        <div className={clsx(s.wrapper, className)}>
            {cellsStore.map((cell, i) => {
                return (
                    <Cell
                        key={i}
                        {...cell}
                        setCellsStore={setCellsStore}
                    />
                )
            })}
        </div>
    )
}

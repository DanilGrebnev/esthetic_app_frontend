'use client'

import clsx from 'clsx'
import { useState } from 'react'

import { createCells } from './lib'
import s from './number-input.module.scss'
import { NumberInputProps, TCells } from './type'
import { Cell } from './ui/Cell'

export const NumberInput = (props: NumberInputProps) => {
    const { length, onChange, className } = props
    const [cells, setCells] = useState<TCells[]>(() => createCells(length))
    const [value, setValue] = useState()

    return (
        <div className={clsx(s.wrapper, className)}>
            {cells.map(({ focus, position }, i) => {
                return (
                    <Cell
                        key={i}
                        position={position}
                        focus={focus}
                        setCells={setCells}
                    />
                )
            })}
        </div>
    )
}

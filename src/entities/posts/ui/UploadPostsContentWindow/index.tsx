'use client'

import { readFile } from '@/shared/utils/readFile'
import clsx from 'clsx'
import { ChangeEvent, type DragEvent, useRef, useState } from 'react'

import { usePostsSliceActions } from '../../model/slice'
import s from './s.module.scss'

export const UploadPostsContentWindow = () => {
    const [isOver, setIsOver] = useState<boolean>(false)
    const setFile = usePostsSliceActions().setFileData

    const inputRef = useRef<HTMLInputElement>(null)

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const result = await readFile(e.target.files?.[0])
        setFile(result)
    }

    const onDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const file = await readFile(e.dataTransfer.files[0])
        setFile(file)
        setIsOver(false)
    }

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsOver(true)
    }

    const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        setIsOver(false)
    }

    const onClick = () => {
        inputRef.current?.click()
    }

    return (
        <div
            className={clsx(s.upload, { [s['drop-zone-over']]: isOver })}
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onClick={onClick}
        >
            <p>Нажмите для выбора или перетащите нужный файл</p>
            <input
                onChange={onChange}
                ref={inputRef}
                name='img'
                accept='image/*'
                type='file'
                hidden={true}
            />
        </div>
    )
}

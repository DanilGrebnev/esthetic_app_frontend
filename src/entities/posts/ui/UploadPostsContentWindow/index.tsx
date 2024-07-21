'use client'

import { readFile } from '@/shared/utils/readFile'
import clsx from 'clsx'
import { type DragEvent, useState } from 'react'

import { usePostsSliceActions } from '../../model/slice'
import { UploadPostsContentBtn } from '../UploadPostsContentBtn'
import s from './s.module.sass'

export const UploadPostsContentWindow = () => {
    const [isOver, setIsOver] = useState<boolean>(false)
    const setFile = usePostsSliceActions().setFileData

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

    return (
        <div
            className={clsx(s.upload, { [s['drop-zone-over']]: isOver })}
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
        >
            <UploadPostsContentBtn />
        </div>
    )
}

'use client'

import clsx from 'clsx'
import {
    type ChangeEvent,
    type DragEvent,
    type FC,
    useRef,
    useState,
} from 'react'

import s from './s.module.scss'
import { stopEventPropAndPrevDef } from './utils'

interface IUploadFiles {
    onChange: (files: FileList) => void
    className?: string
    placeholder?: string
}

export const UploadFiles: FC<IUploadFiles> = (props) => {
    const {
        onChange: onChangeFromProps,
        placeholder = 'Загрузить изображение',
        className,
    } = props
    const [isOver, setIsOver] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        onChangeFromProps(files as FileList)
    }

    const onDrop = stopEventPropAndPrevDef((e: DragEvent<HTMLDivElement>) => {
        const { files } = e.dataTransfer
        onChangeFromProps(files)
        setIsOver(false)
    })

    const onDragOver = stopEventPropAndPrevDef(() => {
        setIsOver(true)
    })

    const onDragEnter = stopEventPropAndPrevDef(() => {})

    const onDragLeave = () => {
        setIsOver(false)
    }

    const onClick = () => {
        inputRef.current?.click()
    }

    return (
        <div
            className={clsx(
                s.upload,
                { [s['drop-zone-over']]: isOver },
                className,
            )}
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onClick={onClick}
        >
            <p>{placeholder}</p>
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

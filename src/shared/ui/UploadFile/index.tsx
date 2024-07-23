'use client'

import { readFile } from '@/shared/utils/readFile'
import clsx from 'clsx'
import {
    type ChangeEvent,
    type DragEvent,
    type FC,
    useRef,
    useState,
} from 'react'

import s from './s.module.scss'

interface IUploadFiles {
    onChange: (file: string) => void
    className?: string
    placeholder?: string
}
type TDrag = DragEvent<HTMLDivElement>
export const UploadFiles: FC<IUploadFiles> = (props) => {
    const {
        onChange: onChangeFromProps,
        placeholder = 'Загрузить изображение',
        className,
    } = props
    const [isOver, setIsOver] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        readFile(e.target.files?.[0]).then((file) => {
            onChangeFromProps(file as string)
        })
    }

    const onDrop = async (e: TDrag) => {
        e.preventDefault()
        e.stopPropagation()

        readFile(e.dataTransfer.files[0]).then((file) => {
            onChangeFromProps(file as string)
        })

        setIsOver(false)
    }

    const onDragOver = (e: TDrag) => {
        e.preventDefault()
        e.stopPropagation()
        setIsOver(true)
    }

    const onDragEnter = (e: TDrag) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const onDragLeave = (e: TDrag) => {
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

'use client'

import { PreviewImageRedactor } from '@/entities/posts/ui/PreviewImageRedactor'
import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { UploadFiles } from '@/shared/ui/UploadFile'
import { type IUploadFiles } from '@/shared/ui/UploadFile/type'
import { readFile } from '@/shared/utils/readFile'
import { clsx } from 'clsx'
import Image from 'next/image'
import { forwardRef, memo, useRef, useState } from 'react'

import { usePostsSliceActions } from '../../model/slice'
import s from './s.module.scss'

interface Props extends Omit<IUploadFiles, 'onChange' | 'placeholder'> {
    className?: string
    name?: string
}

export const UploadPostsContentWindow = memo(
    forwardRef<HTMLInputElement, Props>((props, ref) => {
        const { className, name, ...other } = props

        const [file, setFile] = useState<string | null>(null)

        const actions = usePostsSliceActions()
        const inputRef = useRef<HTMLInputElement | null>(null)
        const combinedRef = useCombinedRef(inputRef, ref)

        const onChange = (files: FileList) => {
            readFile(files[0]).then((file) => {
                actions.setFileData(file as string)
                setFile(file as string)
            })
        }

        const onDelete = () => {
            setFile(null)
            if (!inputRef.current) return
            inputRef.current.value = ''
        }

        return (
            <>
                <UploadFiles
                    className={clsx({ [s.hidden]: file }, className)}
                    onChange={onChange}
                    ref={combinedRef}
                    name={name}
                    {...other}
                    placeholder={
                        'Нажмите для выбора или перетащите нужный файл'
                    }
                />
                {file && (
                    <PreviewImageRedactor
                        image={file}
                        onDeleteFile={onDelete}
                    />
                )}
            </>
        )
    }),
)

UploadPostsContentWindow.displayName = 'UploadPostsContentWindow'

'use client'

import { PreviewImageRedactor } from '@/entities/posts/ui/PreviewImageRedactor'
import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { type TCreatePosts } from '@/shared/types/posts'
import { UploadFiles } from '@/shared/ui/UploadFile'
import { type IUploadFiles } from '@/shared/ui/UploadFile/model/type'
import { readFile } from '@/shared/utils/readFile'
import { clsx } from 'clsx'
import { forwardRef, memo, useRef, useState } from 'react'
import { type UseFormClearErrors } from 'react-hook-form'

import { usePostsSliceActions } from '../../../../shared/store/posts'
import s from './s.module.scss'

interface UploadPostsContentWindowProps
    extends Omit<IUploadFiles, 'onChange' | 'placeholder'> {
    className?: string
    name?: string
    isLoading?: boolean
    isError?: boolean
    clearErrors?: UseFormClearErrors<TCreatePosts>
}

export const UploadPostsContentWindow = memo(
    forwardRef<HTMLInputElement, UploadPostsContentWindowProps>(
        (props, ref) => {
            const {
                className,
                name,
                isLoading,
                isError,
                clearErrors,
                ...other
            } = props

            const [file, setFile] = useState<string | null>(null)

            const actions = usePostsSliceActions()
            const inputRef = useRef<HTMLInputElement | null>(null)
            const combinedRef = useCombinedRef<HTMLInputElement>(inputRef, ref)

            const onChange = (files: FileList) => {
                readFile(files[0]).then((file) => {
                    actions.setFileData(file as string)
                    setFile(file as string)
                    clearErrors?.('file')
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
                        className={clsx(
                            s.upload,
                            { [s.hidden]: file },
                            className,
                        )}
                        onChange={onChange}
                        isError={isError}
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
        },
    ),
)

UploadPostsContentWindow.displayName = 'UploadPostsContentWindow'

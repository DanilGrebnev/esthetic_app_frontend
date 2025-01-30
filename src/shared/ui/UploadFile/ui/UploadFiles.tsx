'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import clsx from 'clsx'
import { forwardRef, memo, useRef, useState } from 'react'

import { type IUploadFiles } from '../model/type'
import {
    createOnChange,
    createOnDrop,
    stopPropAndPrevDef,
} from '../model/utils'
import s from './s.module.scss'

export const UploadFiles = memo(
    forwardRef<HTMLInputElement, IUploadFiles>((props: IUploadFiles, ref) => {
        const [isOver, setIsOver] = useState<boolean>(false)

        const inputRef = useRef<HTMLInputElement>(null)
        const combineRef = useCombinedRef<HTMLInputElement>(ref, inputRef)
        const onChange = createOnChange(props)
        const onDrop = createOnDrop(props, inputRef, setIsOver)

        const onDragOver = stopPropAndPrevDef(() => {})
        const onDragEnter = stopPropAndPrevDef(() => {
            setIsOver(true)
        })

        const onDragLeave = () => {
            setIsOver(false)
        }

        return (
            <div
                className={clsx(
                    s.upload,
                    {
                        [s['drop-zone-over']]: isOver,
                        [s.error]: props.isError,
                        [s.disabled]: props.disabled,
                    },
                    props.className,
                )}
                onDrop={onDrop}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onClick={() => inputRef.current?.click()}
            >
                <p className={s.text}>
                    {props.placeholder || 'Загрузить изображение'}
                </p>
                <input
                    onChange={onChange}
                    ref={combineRef}
                    name={props.name}
                    accept='image/*'
                    type='file'
                    hidden={true}
                />
            </div>
        )
    }),
)

UploadFiles.displayName = 'UploadFiles'

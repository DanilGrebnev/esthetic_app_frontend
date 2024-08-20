'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import clsx from 'clsx'
import { forwardRef, memo, useRef, useState } from 'react'

import s from './s.module.scss'
import { type IUploadFiles } from './type'
import { createOnChange, createOnDrop, stopPropAndPrevDef } from './utils'

export const UploadFiles = memo(
    forwardRef<HTMLInputElement, IUploadFiles>((props, ref) => {
        const [isOver, setIsOver] = useState<boolean>(false)

        const inputRef = useRef<HTMLInputElement>(null)
        const combineRef = useCombinedRef(ref, inputRef)
        const onChange = createOnChange(props)
        const onDrop = createOnDrop(props, inputRef, setIsOver)

        /* Сбрасывает поведение по умолчанию */
        const onDragOver = stopPropAndPrevDef((e) => {})

        const onDragEnter = stopPropAndPrevDef((e) => {
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

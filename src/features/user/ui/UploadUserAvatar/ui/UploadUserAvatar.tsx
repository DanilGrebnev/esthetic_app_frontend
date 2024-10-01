'use client'

import { UploadFiles } from '@/shared/ui/UploadFile'
import { clsx } from 'clsx'
import Image from 'next/image'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import s from './UploadUserAvatar.module.scss'

interface UploadUserAvatar {
    onChange?: (file: File) => void
    className?: string
    defaultValue?: string | null
}

export const UploadUserAvatar: FC<UploadUserAvatar> = (props) => {
    const { onChange, defaultValue, className } = props

    const [objectUrl, setObjectUrl] = useState<string | null>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (defaultValue) {
            setObjectUrl(defaultValue)
        }
    }, [defaultValue])

    const deleteAvatar = useCallback(() => {
        if (!fileRef.current) return
        setObjectUrl('')
        fileRef.current.value = ''
    }, [])

    return (
        <div className={clsx(s['upload-user-avatar-container'], className)}>
            <div className={s['preview-area']}>
                <UploadFiles
                    ref={fileRef}
                    placeholder='Загрузить аватар'
                    className={clsx(s['upload-area'], {
                        [s.hidden]: objectUrl,
                    })}
                    name='avatar'
                    onChange={(files) => {
                        onChange?.(files[0])
                    }}
                    onSetObjectURL={(string) => {
                        setObjectUrl(string)
                    }}
                />

                {objectUrl && (
                    <>
                        <Image
                            fill={true}
                            src={objectUrl}
                            priority={false}
                            alt='Предпросмотр аватара'
                            className={s['avatar-preview']}
                        />
                        <div
                            onClick={deleteAvatar}
                            className={s['delete-avatar-area']}
                        >
                            Удалить
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

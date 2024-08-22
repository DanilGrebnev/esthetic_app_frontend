'use client'

import { clsx } from 'clsx'
import Image from 'next/image'
import { type FC, memo, useState } from 'react'

import { Tabs } from '../Tabs'
import s from './s.module.scss'

interface PreviewImageProps {
    image: string
    onDeleteFile: () => void
    disabled?: boolean
}

export const PreviewImageRedactor: FC<PreviewImageProps> = memo((props) => {
    const { image, onDeleteFile, disabled } = props

    const [aspect, setAspect] = useState<string>('9/16')

    const changeAspect = (aspect: string) => {
        setAspect(aspect)
    }

    const onDeleteImage = () => {
        onDeleteFile()
    }

    return (
        <div className={clsx(s.redactor, { [s.disabled]: disabled })}>
            <Tabs
                name='aspectRatio'
                onChange={changeAspect}
            />
            <div
                className={s['img-wrapper']}
                style={{
                    aspectRatio: aspect,
                }}
            >
                <Image
                    sizes='200px'
                    className={s.img}
                    alt='preview'
                    src={image}
                    fill={true}
                />
                <div
                    onClick={onDeleteImage}
                    className={s.delete}
                >
                    Удалить
                </div>
            </div>
        </div>
    )
})

PreviewImageRedactor.displayName = 'PreviewImageRedactor'

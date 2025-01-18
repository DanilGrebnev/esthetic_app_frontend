'use client'

import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { clsx } from 'clsx'
import Image from 'next/image'
import { memo, useState } from 'react'

import { Tabs } from '../Tabs'
import s from './s.module.scss'

interface PreviewImageProps {
    image: string
    onDeleteFile: () => void
    disabled?: boolean
}

export const PreviewImageRedactor = memo((props: PreviewImageProps) => {
    const { image, onDeleteFile, disabled } = props

    const [aspect, setAspect] = useState<string>(aspectRatioVariants[0])

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
                    className={s.delete}
                    onClick={onDeleteImage}
                >
                    Удалить
                </div>
            </div>
        </div>
    )
})

PreviewImageRedactor.displayName = 'PreviewImageRedactor'

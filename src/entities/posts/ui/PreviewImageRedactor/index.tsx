'use client'

import Image from 'next/image'
import { type FC, useState } from 'react'

import { useGetPostsImageSelector } from '../../model/slice'
import { Tabs } from '../Tabs'
import s from './s.module.sass'

interface PreviewImageProps {}

export const PreviewImageRedactor: FC<PreviewImageProps> = () => {
    const image = useGetPostsImageSelector() as string

    const [aspect, setAspect] = useState<string>('9/16')

    const changeAspect = (aspect: string) => {
        setAspect(aspect)
    }

    return (
        <div className={s.redactor}>
            <Tabs onChange={changeAspect} />
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
            </div>
        </div>
    )
}

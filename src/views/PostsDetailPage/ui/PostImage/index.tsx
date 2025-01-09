'use client'

import { ImageWithBlure } from '@/shared/ui/ImageWithBlure'
import { calculateHeightFromAspectRatio } from '@/shared/utils/calculateHeightFromAspectRatio'
import { useLayoutEffect, useRef, useState } from 'react'

import s from './post-image.module.scss'

interface PostImageProps {
    aspectRatio: string
    name: string
    url: string
    urlBlur: string
}

export const PostImage = (props: PostImageProps) => {
    const { aspectRatio, name = '', url, urlBlur } = props
    const ref = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number>(0)

    useLayoutEffect(() => {
        if (!ref.current) return
        setHeight(ref.current.clientWidth)
    }, [])

    return (
        <div
            ref={ref}
            className={s['image-container']}
            style={{
                height: calculateHeightFromAspectRatio(aspectRatio, height),
                minHeight: calculateHeightFromAspectRatio(aspectRatio, height),
            }}
        >
            <ImageWithBlure
                className={s.img}
                fill={true}
                priority={false}
                sizes='400px'
                quality={30}
                loading='lazy'
                alt={name}
                src={url}
                blurDataURL={urlBlur}
            />
        </div>
    )
}

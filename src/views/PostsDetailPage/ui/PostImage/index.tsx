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
    const [h, setH] = useState<number>(0)

    useLayoutEffect(() => {
        if (!ref.current) return
        setH(ref.current.clientWidth)
    }, [])

    return (
        <div
            ref={ref}
            className={s['image-container']}
            style={{
                minHeight: calculateHeightFromAspectRatio(aspectRatio, h),
                maxHeight: calculateHeightFromAspectRatio(aspectRatio, h),
            }}
        >
            <ImageWithBlure
                className='object-cover'
                fill={true}
                sizes='400px'
                quality={100}
                loading='lazy'
                alt={name}
                src={url}
                blurDataURL={urlBlur}
            />
        </div>
    )
}

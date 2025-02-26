'use client'

import { useGetDetailPostsQuery } from '@/shared/api/posts'
import { ImageWithBlure } from '@/shared/ui/ImageWithBlure'
import { Skeleton } from '@/shared/ui/Skeleton'
import { calculateHeightFromAspectRatio } from '@/shared/utils/calculateHeightFromAspectRatio'
import clsx from 'clsx'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import s from './post-image.module.scss'

interface PostImageProps {
    postId: string
    className?: string
}

export const PostImage = (props: PostImageProps) => {
    const { postId, className } = props
    const { data, isPending } = useGetDetailPostsQuery(postId)

    const ref = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number>(0)

    useEffect(() => {
        if (!ref.current) return
        setHeight(ref.current.clientWidth)
    }, [isPending])

    if (!data || isPending) {
        return <Skeleton className='w-full h-[80%]' />
    }

    const {
        post: {
            media: { aspectRatio, url, urlBlur },
        },
    } = data

    return (
        <div
            ref={ref}
            className={clsx(s.image_container, className)}
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
                quality={100}
                loading='lazy'
                alt=''
                src={url}
                blurDataURL={urlBlur}
            />
        </div>
    )
}

'use client'

import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { getRandomElementFromArray as random } from '@/shared/utils/getRandomElementFromArr'
import { Skeleton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import s from './PostsCardSkeleton.module.scss'

const calculateHeightByAspectRatio = (
    width: number,
    aspect: (typeof aspectRatioVariants)[number],
) => {
    const o = aspectRatioVariants.reduce(
        (acc, aspect) => {
            const [l, r] = aspect.split('/')

            acc[aspect] = +l / +r

            return acc
        },
        {} as Record<(typeof aspectRatioVariants)[number], number>,
    )

    return +width / o[aspect]
}

export const PostsCardSkeleton = () => {
    const [height, setHeight] = useState('')

    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!ref?.current) return
        const r = random(aspectRatioVariants)
        const height =
            Math.floor(
                calculateHeightByAspectRatio(ref.current.clientWidth, r),
            ) + 'px'
        setHeight(height)
    }, [])

    return (
        <Skeleton
            ref={ref}
            variant='rounded'
            className={s.skeleton}
            style={{
                height,
            }}
        />
    )
}

PostsCardSkeleton.displayName = 'PostsCardSkeleton'

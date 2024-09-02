'use client'

import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { getRandomElementFromArray as random } from '@/shared/utils/getRandomElementFromArr'
import { Skeleton, StyledEngineProvider } from '@mui/material'
import { type FC, useEffect, useRef, useState } from 'react'

import s from './PostsCardSkeleton.module.scss'

interface PostsCardSkeletonProps {}

type TAcc = Record<(typeof aspectRatioVariants)[number], number>

const calculateHeightByAspectRatio = (
    width: number,
    aspect: (typeof aspectRatioVariants)[number],
) => {
    const o = aspectRatioVariants.reduce((acc, aspect) => {
        const [l, r] = aspect.split('/')

        acc[aspect] = +l / +r

        return acc
    }, {} as TAcc)

    return +width / o[aspect]
}

export const PostsCardSkeleton: FC<PostsCardSkeletonProps> = () => {
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
        <StyledEngineProvider injectFirst>
            <Skeleton
                ref={ref}
                variant='rounded'
                className={s.skeleton}
                style={{
                    height,
                }}
            />
        </StyledEngineProvider>
    )
}

PostsCardSkeleton.displayName = 'PostsCardSkeleton'

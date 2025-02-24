'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useFixSize } from '@/shared/hooks/useFixSize'
import { calculateHeightFromAspectRatio } from '@/shared/utils/calculateHeightFromAspectRatio'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import s from './post-card.module.scss'

interface PostCardProps {
    aspectRatio?: string
}

export const PostCard = (props: PostCardProps) => {
    const { aspectRatio } = props
    const [h, setH] = useState<string | 'auto'>('auto')

    const { nodeRef, fixHeightStyle, size } = useFixSize<HTMLDivElement>()
    const ref = useRef<HTMLDivElement>(null)

    const combinedRef = useCombinedRef<HTMLDivElement>(nodeRef, ref)

    useEffect(() => {
        console.log(fixHeightStyle)
    }, [fixHeightStyle])

    useLayoutEffect(() => {
        // const h = ref?.current?.offsetHeight
        const w = ref?.current?.offsetWidth
        if (!w) return
        const height = calculateHeightFromAspectRatio('9/16', w)
        setH(height + 'px')
    }, [])

    return (
        <div
            ref={combinedRef}
            style={{ ...fixHeightStyle }}
            className={s.card_wrapper}
        >
            <main
                style={{ aspectRatio }}
                className={s.body}
            >
                <Image
                    alt='test'
                    src='/assets/test_photo.webp'
                    fill={true}
                    className={s.img}
                />
            </main>
        </div>
    )
}

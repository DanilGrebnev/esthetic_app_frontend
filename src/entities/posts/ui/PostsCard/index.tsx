'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { type FC, useEffect, useRef, useState } from 'react'

import { calculateCardHeight } from '../../model/lib/calculateCardHeight'
import { CardCircleIcon } from '../CardCircleIcon'
import { SavePostsButton } from '../SavePostsButton'
import s from './s.module.sass'

interface PostCardProps {
    url: string
    aspect?: string
    className?: string
    name: string
}

export const PostsCard: FC<PostCardProps> = (props) => {
    const { url, name, aspect = '9/16', className } = props
    const [height, setHeight] = useState(0)

    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!cardRef.current) return
        const height = calculateCardHeight(
            aspect,
            cardRef?.current?.offsetWidth,
        )

        setHeight(height)
    }, [aspect])

    return (
        <div
            ref={cardRef}
            className={clsx(
                s.card,
                `relative w-full cursor-pointer overflow-hidden rounded-[20px]`,
                className,
            )}
            style={{ height: height + 'px' }}
        >
            <div
                className={clsx(
                    s['button-group'],
                    'absolute z-[1] h-full w-full',
                )}
            >
                <SavePostsButton />
                <CardCircleIcon
                    href={url}
                    name={name}
                    variant='download'
                    className='absolute bottom-[10px] right-[10px]'
                />
            </div>
            <Image
                className='select-none object-cover'
                loading='lazy'
                alt='test'
                sizes='200px'
                src={url}
                fill={true}
            />
        </div>
    )
}

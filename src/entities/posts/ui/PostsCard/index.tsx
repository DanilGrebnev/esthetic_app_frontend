'use client'

import { SavePostsButton } from '@/entities/posts/ui/SavePostsButton'
import { CircleButton } from '@/shared/ui/CircleButton'
import clsx from 'clsx'
import Image from 'next/image'
import { type FC } from 'react'

import s from './s.module.scss'

interface PostCardProps {
    url: string
    aspect?: string
    className?: string
    name: string
}

export const PostsCard: FC<PostCardProps> = (props) => {
    const { url, name, aspect = '9/16', className } = props

    return (
        <div
            className={clsx(s.card, className)}
            style={{ aspectRatio: aspect }}
        >
            <div className={s['button-group']}>
                <SavePostsButton className={s['save-btn']} />
                <CircleButton
                    href={url}
                    name={name}
                    variant='download'
                    className={s['card-circle-icon']}
                />
            </div>
            <Image
                className={s.img}
                loading='lazy'
                alt='test'
                sizes='200px'
                src={url}
                fill={true}
            />
        </div>
    )
}

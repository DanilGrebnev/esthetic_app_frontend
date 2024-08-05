'use client'

import { CircleButton } from '@/shared/ui/CircleButton'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'

import { SavePostsButton } from '../SavePostsButton'
import s from './s.module.scss'

interface PostCardProps {
    mediaUrl: string
    aspect?: string
    className?: string
    name: string
}

export const PostsCard: FC<PostCardProps> = (props) => {
    const { mediaUrl, name, aspect = '9/16', className } = props
    const href = '/posts-detail/postId'

    return (
        <Link
            className={clsx(s.card, className)}
            style={{ aspectRatio: aspect }}
            href={href}
        >
            <div className={s['button-group']}>
                <SavePostsButton className={s['save-btn']} />
                <CircleButton
                    href={mediaUrl}
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
                src={mediaUrl}
                fill={true}
            />
        </Link>
    )
}

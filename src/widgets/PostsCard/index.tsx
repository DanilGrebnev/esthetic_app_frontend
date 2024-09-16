'use client'

import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn } from '@/entities/posts'
import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { routes } from '@/shared/routes'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'

import s from './s.module.scss'

interface PostCardProps {
    mediaUrl: string
    aspect?: (typeof aspectRatioVariants)[number]
    className?: string
    name: string
    postId: string
}

export const PostsCard: FC<PostCardProps> = (props) => {
    const { mediaUrl, aspect = '9/16', postId, className } = props
    const router = useRouter()
    const href = routes.postsDetail.getRoute(postId)

    return (
        <div
            className={clsx(s.card, className)}
            style={{ aspectRatio: aspect }}
            onClick={() => router.push(href)}
        >
            <div className={s['button-group']}>
                <SaveToDashboardButton
                    postsId={postId}
                    className={s['save-btn']}
                />
                <DownloadFileBtn
                    href={mediaUrl}
                    downloadFileName={'test_file_name'}
                    className={s['card-circle-icon']}
                />
            </div>
            <Image
                className={s.img}
                loading='lazy'
                alt='test'
                sizes='(max-width: 500px) 50vw'
                src={mediaUrl}
                fill={true}
            />
        </div>
    )
}

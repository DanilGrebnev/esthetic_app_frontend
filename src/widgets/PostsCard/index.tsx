'use client'

import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn } from '@/entities/posts'
import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { routes } from '@/shared/routes'
import clsx from 'clsx'
import { m } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FC, useEffect } from 'react'

import s from './s.module.scss'

interface PostCardProps {
    url: string
    urlBlur: string
    aspectRatio?: (typeof aspectRatioVariants)[number]
    className?: string
    name: string
    postId: string
}

export const PostsCard: FC<PostCardProps> = (props) => {
    const { url, urlBlur, aspectRatio = '9/16', postId, className } = props
    const router = useRouter()
    const href = routes.postsDetail.getRoute(postId)

    return (
        <div
            className={clsx(s.card, className)}
            style={{ aspectRatio }}
            onClick={() => router.push(href)}
        >
            <div className={s['button-group']}>
                <SaveToDashboardButton
                    postsId={postId}
                    className={s['save-btn']}
                />
                <DownloadFileBtn
                    href={url}
                    downloadFileName={'test_file_name'}
                    className={s['card-circle-icon']}
                />
            </div>
            <Image
                className={s.img}
                loading='lazy'
                placeholder='blur'
                blurDataURL={urlBlur}
                alt='test'
                quality={75}
                sizes='(max-width: 250px)'
                src={url}
                fill={true}
            />
        </div>
    )
}

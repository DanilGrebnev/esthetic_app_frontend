'use client'

import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn } from '@/entities/posts'
import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { routes } from '@/shared/routes'
import clsx from 'clsx'
import { m } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'

import s from './s.module.scss'

interface PostCardProps {
    url: string
    urlBlur: string
    aspectRatio?: (typeof aspectRatioVariants)[number]
    className?: string
    name: string
    postId: string
    i?: number
}

export const PostsCard: FC<PostCardProps> = (props) => {
    const { url, urlBlur, i, aspectRatio = '9/16', postId, className } = props
    const router = useRouter()
    const href = routes.postsDetail.getRoute(postId)

    return (
        <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1, delay: i ? 0.1 * i : 0 }}
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
                // placeholder='blur'
                blurDataURL={urlBlur}
                alt='test'
                sizes='(max-width: 250px)'
                src={url}
                fill={true}
            />
        </m.div>
    )
}

'use client'

import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn } from '@/entities/posts'
import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { routes } from '@/shared/routes'
import { ImageWithBlure } from '@/shared/ui/ImageWithBlure'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { type CSSProperties } from 'react'

import s from './s.module.scss'

interface PostCardProps {
    url: string
    urlBlur: string
    aspectRatio?: (typeof aspectRatioVariants)[number]
    className?: string
    name: string
    postId: string
    quality?: number
    style?: CSSProperties
}

export const PostsCard = (props: PostCardProps) => {
    const {
        url,
        quality = 20,
        urlBlur,
        aspectRatio = '9/16',
        postId,
        className,
        style,
    } = props
    const router = useRouter()
    const href = routes.postsDetail.getRoute(postId)

    return (
        <div
            className={clsx(s.card, className)}
            style={{ aspectRatio, minHeight: '20px', ...style }}
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

            <ImageWithBlure
                className={s.img}
                loading='lazy'
                blurDataURL={urlBlur}
                alt='test'
                quality={quality}
                sizes='(max-width: 200px)'
                src={url}
                fill={true}
            />
        </div>
    )
}

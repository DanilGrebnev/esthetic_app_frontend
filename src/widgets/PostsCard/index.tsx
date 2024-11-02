'use client'

import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn } from '@/entities/posts'
import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { routes } from '@/shared/routes'
import { ImageWithBlure } from '@/shared/ui/ImageWithBlure'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'
import { useInView } from 'react-intersection-observer'

import s from './s.module.scss'

interface PostCardProps {
    url: string
    urlBlur: string
    aspectRatio?: (typeof aspectRatioVariants)[number]
    className?: string
    name: string
    postId: string
    quality?: number
}

export const PostsCard: FC<PostCardProps> = (props) => {
    const {
        url,
        quality = 20,
        urlBlur,
        aspectRatio = '9/16',
        postId,
        className,
    } = props
    const router = useRouter()
    const href = routes.postsDetail.getRoute(postId)

    const { ref, inView } = useInView({ threshold: 0.1 })

    return (
        <div
            ref={ref}
            className={clsx(s.card, className)}
            style={{ aspectRatio, minHeight: '20px' }}
            onClick={() => router.push(href)}
        >
            {inView && (
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
            )}

            {inView && (
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
            )}
        </div>
    )
}

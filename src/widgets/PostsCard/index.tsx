'use client'

import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn } from '@/entities/posts'
import MyPhoto from '@/shared/assets/test_photo.webp'
import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { routes } from '@/shared/routes'
import { ImageWithBlure } from '@/shared/ui/ImageWithBlure'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { type CSSProperties, memo } from 'react'

import s from './s.module.scss'
import { UserBlock } from './ui/UserBlock'

interface PostCardProps {
    url: string
    urlBlur: string
    aspectRatio?: (typeof aspectRatioVariants)[number]
    className?: string
    name: string
    postId: string
    quality?: number
    style?: CSSProperties

    ownerAvatar?: string
    ownerName?: string

    ownerId?: string
}

export const PostsCard = memo((props: PostCardProps) => {
    const {
        url,
        quality = 20,
        urlBlur,
        aspectRatio = '9/16',
        postId,
        className,
        style,
        ownerAvatar,
        ownerId,
        ownerName,
    } = props
    const router = useRouter()
    const href = routes.postsDetail.getRoute(postId)

    return (
        <div
            className={clsx(s.card, className)}
            style={{ aspectRatio, minHeight: '20px', ...style }}
            onClick={() => router.push(href)}
        >
            <div className={s.wrapper}>
                <div className={s.button_group}>
                    <SaveToDashboardButton
                        postsId={postId}
                        className={s.save_btn}
                    />
                    <DownloadFileBtn
                        href={url}
                        downloadFileName={'test_file_name'}
                        className={s.card_circle_icon}
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
            {ownerId && <UserBlock />}
        </div>
    )
})

PostsCard.displayName = 'PostsCard'

'use client'

import { DownloadFileBtn } from '@/entities/posts/ui/DownloadFileBtn'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { type FC, useState } from 'react'

import { DashboardList } from '../DashboardList/DashboardList'
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
    const [open, setIsOpen] = useState(false)

    const onClick = () => {
        setIsOpen((prev) => !prev)
    }

    const { elementRef } = useOutsideClick({ handler: onClick, attached: open })

    return (
        <Link
            className={clsx(s.card, className)}
            style={{ aspectRatio: aspect }}
            href={href}
        >
            <DashboardList
                className={clsx({ [s.open]: open })}
                ref={elementRef}
            />
            <div className={s['button-group']}>
                <SavePostsButton
                    onClick={onClick}
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
                sizes='200px'
                src={mediaUrl}
                fill={true}
            />
        </Link>
    )
}

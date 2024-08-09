'use client'

import { DashboardList } from '@/entities/dashboard'
import { Modal } from '@/entities/modal'
import { DownloadFileBtn, SavePostsButton } from '@/entities/posts'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FC, useCallback, useState } from 'react'

import s from './s.module.scss'

interface PostCardProps {
    mediaUrl: string
    aspect?: string
    className?: string
    name: string
}

export const PostsCard: FC<PostCardProps> = (props) => {
    const { mediaUrl, name, aspect = '9/16', className } = props
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const href = '/posts-detail/postId'

    const onClick = useCallback((e: any) => {
        e.stopPropagation()
        setOpen(true)
    }, [])

    return (
        <>
            <div
                className={clsx(s.card, className)}
                style={{ aspectRatio: aspect }}
                onClick={() => router.push(href)}
            >
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
            </div>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
            >
                <DashboardList />
            </Modal>
        </>
    )
}

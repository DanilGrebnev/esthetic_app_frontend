'use client'

import { ResponsiveMasonry } from '@/shared/ui/ResponsiveMasonry'
import clsx from 'clsx'
import { type FC } from 'react'

import { mock } from '../../mock'
import { PostsCard } from '../PostsCard'
import s from './s.module.sass'

interface PostsListProps {
    className?: string
}

export const PostsList: FC<PostsListProps> = ({ className }) => {
    return (
        <ResponsiveMasonry
            className={clsx('container', className)}
            columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
            gutter='10px'
        >
            {mock.map(({ url, aspect }, i) => (
                <PostsCard
                    className={s.card}
                    url={url}
                    name={'test_name'}
                    aspect={aspect}
                    key={i}
                />
            ))}
        </ResponsiveMasonry>
    )
}

'use client'

import { PostsListMasonry } from '@/entities/posts'
import { getPosts } from '@/shared/api/postsApi'
import { TPostsCard } from '@/shared/types/posts'
import { ReactNode, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import s from './s.module.scss'

interface PostsListWithPaginationProps {
    children?: ReactNode
}

/* Список постов со встроенной пагинацией */
export const PostsListWithPagination = ({
    children,
}: PostsListWithPaginationProps) => {
    const [posts, setPosts] = useState<TPostsCard[]>([])
    const [offset, setOffset] = useState<number>(0)
    const [loading, setLoading] = useState(true)

    const step = 20
    const limit = offset + step

    const { ref, inView, entry } = useInView({
        threshold: 0,
        rootMargin: '0px 0px 200px 0px',
    })

    useEffect(() => {
        console.log('inView', inView)
    }, [inView])

    const updatePosts = (posts: TPostsCard[] | []) => {
        setPosts((p) => [...p, ...posts])
        setLoading(false)
    }

    useEffect(() => {
        if (entry?.isIntersecting && !loading) {
            setOffset((p) => p + step)
        }
    }, [entry?.isIntersecting, loading])

    /* Запрос на получение постов */
    useEffect(() => {
        // console.log('Запрос...')
        setLoading(true)
        getPosts(offset, limit).then(updatePosts)
    }, [offset, limit])

    useEffect(() => {
        getPosts(offset, limit).then(updatePosts)
    }, [limit, offset])

    return (
        <>
            <PostsListMasonry
                loading={loading}
                posts={posts}
            >
                {children}
            </PostsListMasonry>
            {!loading && (
                <div
                    className={s['intersection-hook']}
                    ref={ref}
                >
                    isIntersecting {entry?.isIntersecting + ''}
                </div>
            )}
        </>
    )
}

'use client'

import { PostsListMasonry } from '@/entities/posts'
import { mockPosts } from '@/shared/api/mock'
import { getPosts } from '@/shared/api/postsApi'
import { TPostsCard } from '@/shared/types/posts'
import { useEffect, useState } from 'react'
import { useIntersectionObserver } from 'react-intersection-observer-hook'

/* Компонент со встроенной пагинацией */
export const PostsListWithPagination = () => {
    const [posts, setPosts] = useState<TPostsCard[]>([])
    const [offset, setOffset] = useState<number>(0)
    const [loading, setLoading] = useState(true)

    const step = 20
    const limit = offset + step
    const [ref, { entry }] = useIntersectionObserver({ threshold: 0.5 })

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
        console.log('Запрос...')
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
            />
            {!loading && <div ref={ref}>Триггер загрузки</div>}
        </>
    )
}

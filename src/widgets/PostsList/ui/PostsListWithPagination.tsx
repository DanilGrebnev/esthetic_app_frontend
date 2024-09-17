'use client'

import { getPosts } from '@/shared/api/postsApi'
import { TPostsCard } from '@/shared/types/posts'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { PostsListMasonry } from './PostsListMasonry'
import s from './s.module.scss'

/* Список постов со встроенной пагинацией */
export const PostsListWithPagination = () => {
    const [posts, setPosts] = useState<TPostsCard[]>([])
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(true)

    const step = 20
    const limit = offset + step

    const { ref, entry } = useInView({
        threshold: 0,
        rootMargin: '0px 0px 200px 0px',
    })

    const updatePosts = (posts: TPostsCard[] | []) => {
        setPosts((p) => [...p, ...posts])
        setLoading(false)
    }

    useEffect(() => {
        if (entry?.isIntersecting && !loading) {
            setOffset((p) => p + step)
        }
    }, [entry?.isIntersecting, loading])

    /* Запрос на получение постов при монтировании страницы */
    useEffect(
        () => {
            // console.log('Запрос...')
            setLoading(true)
            getPosts(offset, limit).then(updatePosts)
        },
        [] /* eslint-disable-line */,
    )

    /* Получение данных в зависимости от изменения */
    useEffect(() => {
        setLoading(true)
        getPosts(offset, limit).then(updatePosts)
    }, [limit, offset])

    return (
        <>
            <PostsListMasonry
                loading={loading}
                posts={posts}
            />
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

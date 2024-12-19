'use client'

import { useGetRecommendedPosts } from '@/shared/api/posts'
import { PostsCard } from '@/widgets/PostsCard'
import { forwardRef, useEffect, useMemo } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import { useIntersectionObserver } from 'usehooks-ts'

const ITEM_WIDTH = 400
const ITEM_HEIGHT = 300

const gridComponents = {
    List: forwardRef<HTMLDivElement, any>(
        ({ style, children, ...props }, ref) => (
            <div
                id='LIST'
                ref={ref}
                {...props}
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    ...style,
                }}
            >
                {children}
            </div>
        ),
    ),

    Footer: (props: { fetchNews: () => any; isPending?: boolean }) => {
        const { fetchNews, isPending } = props
        const { isIntersecting, ref } = useIntersectionObserver({
            rootMargin: '100%',
        })

        useEffect(() => {
            if (isIntersecting && !isPending) {
                fetchNews()
            }
        }, [isIntersecting])

        return (
            <div
                style={{ border: '1px solid black', height: '20px' }}
                ref={ref}
            ></div>
        )
    },

    Item: ({ children, ...props }: any) => {
        return (
            <div
                {...props}
                style={{
                    padding: '10px',
                    height: '400px',
                    width: '20%',
                    display: 'flex',
                    alignContent: 'stretch',
                    boxSizing: 'border-box',
                }}
            >
                {children}
            </div>
        )
    },
}

gridComponents.List.displayName = 'List'

export const PostsList = () => {
    const { data, isPending, fetchNextPage } = useGetRecommendedPosts()

    const dataList = useMemo(() => {
        return data?.pages.map((page) => page.posts).flat(1)
    }, [data?.pages.length])

    if (!dataList?.length || isPending) {
        return <h3>Загрузка</h3>
    }

    return (
        <VirtuosoGrid
            style={{ height: '100%', flexGrow: 1 }}
            totalCount={dataList?.length}
            components={{
                ...gridComponents,
                Footer: () => (
                    <gridComponents.Footer
                        fetchNews={fetchNextPage}
                        isPending={isPending}
                    />
                ),
            }}
            itemContent={(index) => {
                const item = dataList?.[index]

                return (
                    <PostsCard
                        key={item.postId}
                        url={item.url}
                        urlBlur={item.urlBlur}
                        postId={item.postId}
                        name=''
                    />
                )
            }}
        />
    )
}

//<PostsCard
//    style={{ width: '100%', height: '100%' }}
//    postId={item.postId}
//    url={item.url}
//    urlBlur={item.urlBlur}
//    name={''}
///>

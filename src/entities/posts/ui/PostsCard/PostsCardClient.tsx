'use client'

import dynamic from 'next/dynamic'

export const PostsCardClient = dynamic(
    () => import('./index').then(({ PostsCard }) => PostsCard),
    { ssr: false },
)

import { type FC } from 'react'

import { mock } from '../../mock'
import { PostsCard } from '../PostsCard'
import { PostsListMasonryContainer } from '../PostsListMasonryContainer'

interface PostsListProps {
    className?: string
}

export const PostsList: FC<PostsListProps> = ({ className }) => {
    return (
        <PostsListMasonryContainer className={className}>
            {mock.map(({ url, aspect }, i) => (
                <PostsCard
                    key={url}
                    url={url}
                    name={'test_name'}
                    aspect={aspect}
                />
            ))}
        </PostsListMasonryContainer>
    )
}

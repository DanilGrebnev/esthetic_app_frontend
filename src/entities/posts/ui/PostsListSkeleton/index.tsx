'use client'

import { Container } from '@/shared/ui/Container'
import { getRandomElementFromArray as ran } from '@/shared/utils/getRandomElementFromArr'
import { Skeleton, StyledEngineProvider } from '@mui/material'
import { nanoid } from 'nanoid'

import { PostsListMasonryContainer } from '../PostsListMasonryContainer'
import s from './s.module.sass'

export const PostsListSkeleton = () => {
    const asp = ['9/16', '2/3', '3/4', '4/5', '1/1']

    return (
        <Container>
            <PostsListMasonryContainer className='PostsList-loader'>
                {Array(25)
                    .fill('')
                    .map(() => {
                        return (
                            <StyledEngineProvider
                                key={nanoid()}
                                injectFirst
                            >
                                <Skeleton
                                    variant='rounded'
                                    className={s.skeleton}
                                    style={{
                                        aspectRatio: ran(asp),
                                    }}
                                />
                            </StyledEngineProvider>
                        )
                    })}
            </PostsListMasonryContainer>
        </Container>
    )
}

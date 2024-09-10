import type { Meta, StoryObj } from '@storybook/react'

import { PostsListSkeleton } from './index'

const meta: Meta<typeof PostsListSkeleton> = {
    title: 'entities/posts/PostsListSkeleton',
    component: PostsListSkeleton,
    args: {
        withMasonryContainer: true,
    },
}

export default meta
type Story = StoryObj<typeof PostsListSkeleton>

export const Primary: Story = {
    args: {},
}

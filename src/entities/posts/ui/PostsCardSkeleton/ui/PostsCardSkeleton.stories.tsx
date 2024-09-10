import type { Meta, StoryObj } from '@storybook/react'

import { PostsCardSkeleton } from './PostsCardSkeleton'

const meta: Meta<typeof PostsCardSkeleton> = {
    title: 'entities/posts/PostsCardSkeleton',
    component: PostsCardSkeleton,
    decorators: [
        (Story) => {
            return (
                <div style={{ width: '200px' }}>
                    <Story />
                </div>
            )
        },
    ],
}

export default meta
type Story = StoryObj<typeof PostsCardSkeleton>

export const Primary: Story = {
    args: {},
}

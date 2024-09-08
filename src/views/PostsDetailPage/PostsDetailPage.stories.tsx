import type { Meta, StoryObj } from '@storybook/react'

import { PostsDetailPage } from './page'

const meta: Meta<typeof PostsDetailPage> = {
    title: 'views/PostsDetailPage',
    component: PostsDetailPage,
}

export default meta

type Story = StoryObj<typeof PostsDetailPage>

export const BasePage: Story = {
    name: 'PostsDetailPage',
}

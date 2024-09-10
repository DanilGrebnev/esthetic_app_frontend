import type { Meta, StoryObj } from '@storybook/react'

import { CreatePostForm } from './index'

const meta: Meta<typeof CreatePostForm> = {
    title: 'entities/posts/CreatePostForm',
    component: CreatePostForm,
}

export default meta
type Story = StoryObj<typeof CreatePostForm>

export const Primary: Story = {
    args: {},
}

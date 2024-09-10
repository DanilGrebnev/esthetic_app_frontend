import type { Meta, StoryObj } from '@storybook/react'

import { DownloadFileBtn } from './index'

const meta: Meta<typeof DownloadFileBtn> = {
    title: 'entities/posts/DownloadFileBtn',
    component: DownloadFileBtn,
}

export default meta
type Story = StoryObj<typeof DownloadFileBtn>

export const Primary: Story = {
    args: {},
}

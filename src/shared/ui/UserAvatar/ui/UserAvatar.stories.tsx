import type { Meta, StoryObj } from '@storybook/react'

import { UserAvatar } from './UserAvatar'

//👇 Imports all Header stories

const meta: Meta<typeof UserAvatar> = {
    title: 'shared/UserAvatar',
    component: UserAvatar,
}

export default meta
type Story = StoryObj<typeof UserAvatar>

export const LUserAvatar: Story = {
    args: {
        size: 'l',
    },
}

export const MUserAvatar: Story = {
    args: {
        size: 'm',
    },
}
export const SUserAvatar: Story = {
    args: {
        size: 's',
    },
}

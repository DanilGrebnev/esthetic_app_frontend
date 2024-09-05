import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './'

const meta = {
    component: Header,
    title: 'widgets/Header',
    tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof Header>

export const CustomHeader: Story = {
    args: {},
    decorators: [
        (Story) => (
            <div style={{ boxShadow: 'var(--global-box-shadow)' }}>
                <Story />
            </div>
        ),
    ],
}

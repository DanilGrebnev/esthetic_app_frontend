import type { Meta, StoryObj } from '@storybook/react'

import { CircularProgress } from './CircularProgress'

const meta: Meta<typeof CircularProgress> = {
    title: 'shared/CircularProgress',
    component: CircularProgress,
}

export default meta
type Story = StoryObj<typeof CircularProgress>

export const Base: Story = {
    name: 'CircularProgress',
}

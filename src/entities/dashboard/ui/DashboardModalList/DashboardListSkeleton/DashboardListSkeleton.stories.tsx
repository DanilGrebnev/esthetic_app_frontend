import type { Meta, StoryObj } from '@storybook/react'

import { DashboardListSkeleton } from './index'

const meta: Meta<typeof DashboardListSkeleton> = {
    title: 'entities/dashboard/DashboardModalList/DashboardListSkeleton',
    component: DashboardListSkeleton,
}

export default meta
type Story = StoryObj<typeof DashboardListSkeleton>

export const Primary: Story = {
    args: {},
}

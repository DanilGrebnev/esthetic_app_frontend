import type { Meta, StoryObj } from '@storybook/react'

import { DashboardModalList } from './index'

const meta: Meta<typeof DashboardModalList> = {
    title: 'entities/dashboard/DashboardModalList',
    component: DashboardModalList,
}

export default meta
type Story = StoryObj<typeof DashboardModalList>

export const Primary: Story = {
    args: {},
}

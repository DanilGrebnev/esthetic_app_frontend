import type { Meta, StoryObj } from '@storybook/react'

import { DashboardItem } from './DashboardItem'

const meta: Meta<typeof DashboardItem> = {
    title: 'entities/dashboard/DashboardModalList/DashboardItem',
    component: DashboardItem,
    args: {
        dashboardName: 'Название доски',
        skeleton: false,
        disabled: false,
        loading: false,
    },
}

export default meta
type Story = StoryObj<typeof DashboardItem>

export const Primary: Story = {}

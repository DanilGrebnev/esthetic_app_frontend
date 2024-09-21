import type { Meta, StoryObj } from '@storybook/react'

import { DashboardItem } from '../../DashboardItem'
import { DashboardGroupContainer } from './DashboardGroupContainer'

const meta: Meta<typeof DashboardGroupContainer> = {
    title: 'entities/dashboard/DashboardModalList/DashboardGroupContainer',
    component: DashboardGroupContainer,
    args: {
        groupName: 'Название группы досок',
        children: Array(10)
            .fill('')
            .map((el, i) => (
                <DashboardItem
                    dashboardId={''}
                    postsId={''}
                    key={i}
                    dashboardName='asd'
                    loading={i % 2 !== 1}
                />
            )),
    },
}

export default meta
type Story = StoryObj<typeof DashboardGroupContainer>

export const Primary: Story = {
    args: {},
}

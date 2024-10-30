import { recommendedTagsInitial } from '@/shared/data/recommendedTagsData'
import type { Meta, StoryObj } from '@storybook/react'

import { RecommendedTags } from './'

const meta: Meta<typeof RecommendedTags> = {
    title: 'shared/RecommendedTags',
    component: RecommendedTags,
}
export default meta

type Story = StoryObj<typeof RecommendedTags>

export const RecommendedTagsStandart: Story = {
    decorators: [
        (Story) => {
            return (
                <div style={{ maxWidth: '500px' }}>
                    <Story />
                </div>
            )
        },
    ],
    args: {
        initialTags: recommendedTagsInitial,
    },
}

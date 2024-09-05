import type { Meta, StoryObj } from '@storybook/react'

import { RecommendedTags } from './'

const meta: Meta<typeof RecommendedTags> = {
    title: 'shared/RecommendedTags',
    component: RecommendedTags,
}
export default meta

type Story = StoryObj<typeof RecommendedTags>

export const RecommendedTagsStandart: Story = {}

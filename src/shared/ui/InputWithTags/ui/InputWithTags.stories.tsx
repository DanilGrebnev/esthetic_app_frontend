import type { Meta, StoryObj } from '@storybook/react'

import { InputWithTags } from './InputWithTags'

const meta: Meta<typeof InputWithTags> = {
    title: 'shared/InputWithTags',
    component: InputWithTags,
}

export default meta
type Story = StoryObj<typeof InputWithTags>

export const InputWithTagsStandart: Story = {}

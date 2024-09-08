import type { Meta, StoryObj } from '@storybook/react'

import { CircleButton } from './index'

const meta: Meta<typeof CircleButton> = {
    title: 'shared/CircleButton',
    component: CircleButton,
    argTypes: {
        icon: {
            options: ['download'],
            description: 'Icon type',
            control: {
                type: 'select',
            },
        },
    },
    args: {
        disabled: false,
    },
}

export default meta
type Story = StoryObj<typeof CircleButton>

export const Primary: Story = {}

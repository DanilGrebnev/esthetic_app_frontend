import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './index'

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    tags: ['autodocs'],
    component: Button,
    argTypes: {
        activeVariant: {
            description: 'Variant active button',
            control: {
                type: 'radio',
            },
            options: ['active-fill', 'active-underline'],
            type: 'string',
        },
        variant: {
            description: 'Button ui variants',
            control: {
                type: 'radio',
            },
            options: ['standart', 'red', 'silver'],
        },
    },
    args: {
        children: 'Отправить',
        disabled: false,
        onClick: action('default action'),
        active: false,
        loading: false,
        className: 'test-class',
        activeVariant: 'active-underline',
    },
    parameters: {
        layout: 'centered',
    },
}

type Story = StoryObj<typeof Button>

// const Template = (args) => <Button {...args} />

export const Standart: Story = {
    args: {
        variant: 'standart',
        onClick: action('default action'),
    },
}

export const Red: Story = {
    args: {
        variant: 'red',
    },
}

export const Silver: Story = {
    args: {
        variant: 'silver',
    },
}

export default meta

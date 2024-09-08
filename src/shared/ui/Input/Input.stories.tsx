import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './index'

const meta: Meta<typeof Input> = {
    title: 'shared/Input',
    tags: ['autodocs'],
    component: Input,
    argTypes: {
        size: {
            control: {
                type: 'radio',
            },
            options: ['small', 'medium'],
            defaultValue: 'medium',
        },
    },

    args: {
        fullWidth: false,
        label: 'Имя',
        placeholder: 'Введите имя',
        disabled: false,
        error: false,
        helperText: '',
    },
}

export default meta

type Story = StoryObj<typeof Input>

export const Standart: Story = {
    args: {},
}

export const Error: Story = {
    args: {
        error: true,
        helperText: 'Поле не может быть пустым',
    },
}

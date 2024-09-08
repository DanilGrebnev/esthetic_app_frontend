import type { Meta, StoryObj } from '@storybook/react'

import { Select as BaseSelect } from './'

const selectOptions = [
    { name: 'one', value: 'one' },
    { name: 'two', value: 'two' },
]

const meta: Meta<typeof BaseSelect> = {
    title: 'shared/Select',
    tags: ['autodocs'],
    parameters: {
        label: 'Доска',
        placeholder: 'Выбрать доску',
        name: 'dashboard',
    },
    component: BaseSelect,
}

type Story = StoryObj<typeof BaseSelect>

const SelectWithData = () => {
    return (
        <BaseSelect
            label='Доска'
            placeholder='Выбрать доску'
            name='dashboard'
            onChange={(data) => console.log(data)}
        >
            {selectOptions}
        </BaseSelect>
    )
}

export const Select: StoryObj = {
    render: () => <SelectWithData />,
}

export default meta

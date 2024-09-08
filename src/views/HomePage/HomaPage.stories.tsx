import { Header } from '@/widgets/Header'
import type { Meta, StoryObj } from '@storybook/react'

import { Home } from './'

const meta: Meta<typeof Home> = {
    title: 'views/HomePage',
    component: Home,
}

export default meta

type Story = StoryObj<typeof Home>

export const BaseHome: Story = {
    name: 'HomePage',
    decorators: [
        (HomePage) => {
            return (
                <div
                    style={{
                        maxHeight: '60vh',
                        position: 'relative',
                        overflow: 'auto',
                    }}
                >
                    <Header />
                    <HomePage />
                </div>
            )
        },
    ],
}

import type { Meta, StoryObj } from '@storybook/react'

import { Container } from './Container'

const TestBlock = ({ children }: { children: string }) => {
    return (
        <div
            style={{
                height: '200px',
                background: 'blue',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
            }}
        >
            <p>{children}</p>
        </div>
    )
}

const meta: Meta<typeof Container> = {
    title: 'shared/Container',
    component: Container,
    parameters: {
        docs: {
            description: {
                component: 'Container with different width sizes',
            },
        },
    },
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: ['l', 'm', 's'],
        },
    },
    args: {
        size: 'l',
        children: <TestBlock>Test block</TestBlock>,
    },
}

export default meta
type Story = StoryObj<typeof Container>

export const LContainer: Story = {
    args: {
        size: 'l',
        children: <TestBlock>1600 px</TestBlock>,
    },
}

export const MContainer: Story = {
    args: {
        size: 'm',
        children: <TestBlock>1000 px</TestBlock>,
    },
}

export const SContainer: Story = {
    args: {
        size: 's',
        children: <TestBlock>600 px</TestBlock>,
    },
}

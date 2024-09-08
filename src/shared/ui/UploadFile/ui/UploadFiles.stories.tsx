import type { Meta, StoryObj } from '@storybook/react'

import { UploadFiles } from './UploadFiles'

const meta: Meta<typeof UploadFiles> = {
    title: 'shared/UploadFiles',
    component: UploadFiles,
    parameters: {},
    argTypes: {
        onChange: {
            action: 'onChange',
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    maxWidth: '500px',
                    boxShadow: 'var(--global-box-shadow)',
                    borderRadius: 'var(--global-border-radius)',
                    padding: '20px',
                }}
            >
                <Story />
            </div>
        ),
    ],
}

export default meta
type Story = StoryObj<typeof UploadFiles>

export const BaseUploadFiles: Story = {
    args: {},
}

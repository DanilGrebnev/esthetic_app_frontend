import { RegistrationPage } from '@/views/RegistrationPage'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof RegistrationPage> = {
    title: 'views/RegistrationPage',
    component: RegistrationPage,
}
export default meta

type Story = StoryObj<typeof RegistrationPage>

export const RegistrationPageStory: Story = {}

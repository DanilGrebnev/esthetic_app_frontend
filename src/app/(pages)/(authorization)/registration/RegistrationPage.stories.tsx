import { RegistrationForm } from '@/views/SignIn/ui/RegistrationForm/RegistrationForm'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof RegistrationForm> = {
    title: 'views/RegistrationPage',
    component: RegistrationForm,
}
export default meta

type Story = StoryObj<typeof RegistrationForm>

export const RegistrationPage: Story = {}

import '@/app/styles/globals.css'
import '@/app/styles/reset.css'
import '@/app/styles/root.css'
import type { Preview } from '@storybook/react'

const preview: Preview = {
    tags: ['autodocs'],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        nextjs: {
            appDirectory: true,
        },
    },
}

export default preview

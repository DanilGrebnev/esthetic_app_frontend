import type { StorybookConfig } from '@storybook/nextjs'

import { SVGRWebpackStoryBookSetConfig } from './SVGRWebpackStoryBookConfig'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        // '@storybook/addon-storysource',
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
    ],

    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    staticDirs: ['..\\public'],

    webpackFinal: async (config) => {
        SVGRWebpackStoryBookSetConfig(config)

        return config
    },
}
export default config

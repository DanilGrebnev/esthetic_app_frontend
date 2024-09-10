import type { StorybookConfig } from '@storybook/nextjs'

import { SVGRWebpackStoryBookSetConfig } from './SVGRWebpackStoryBookConfig'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    webpackFinal: async (config) => {
        SVGRWebpackStoryBookSetConfig(config)

        return config
    },
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',

        // Not work. Conflict with SVGR settings
        // '@storybook/addon-storysource',
    ],

    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    staticDirs: ['..\\public'],
}
export default config

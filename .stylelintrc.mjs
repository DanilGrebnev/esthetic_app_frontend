/** @type {import('stylelint').Config} */
const config = {
    plugins: [],
    extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'apply',
                    'layer',
                    'variants',
                    'responsive',
                    'screen',
                ],
            },
        ],
    },
}

export default config

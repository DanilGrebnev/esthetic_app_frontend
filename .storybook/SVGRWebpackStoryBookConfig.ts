export const SVGRWebpackStoryBookSetConfig = (config: any) => {
    config.module = config.module || {}
    config.module.rules = config.module.rules || []

    // This modifies the existing image rule to exclude .svg files
    // since you want to handle those files with @svgr/webpack
    const imageRule = config.module.rules.find((rule: any) =>
        rule?.['test']?.test('.svg'),
    )
    if (imageRule) {
        imageRule['exclude'] = /\.svg$/
    }

    // Configure .svg files to be loaded with @svgr/webpack
    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    })
}

module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'production:remote'
            ? { cssnano: {} }
            : {}),
    },
}

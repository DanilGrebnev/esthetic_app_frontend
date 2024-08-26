import dynamic from 'next/dynamic'

export const Client = dynamic(() =>
    import(
        /* webpackChunkName: "test-component" */
        './TestCmp'
    ).then(({ TestCMP }) => TestCMP),
)

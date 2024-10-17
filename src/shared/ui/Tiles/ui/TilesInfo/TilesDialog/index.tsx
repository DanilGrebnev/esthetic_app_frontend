import dynamic from 'next/dynamic'

const _TilesDialogContainer = dynamic(
    () =>
        import(
            /* webpackChunkName: "_TilesDialogContainer" */ './_TilesDialog'
        ).then((p) => p._TilesDialogContainer),
    { ssr: false },
)

const _DialogItem = dynamic(
    () =>
        import(/* webpackChunkName: "_DialogItem" */ './DialogItem').then(
            (p) => p._DialogItem,
        ),
    { ssr: false },
)

export const TilesDialog = {
    Container: _TilesDialogContainer,
    Item: _DialogItem,
} as const

import dynamic from 'next/dynamic'

/* Компонент необходим для встраивания табов */
export const ProgressWindowTab = dynamic(
    () =>
        import('./ProgressWindowTab').then(
            ({ ProgressWindowTab }) => ProgressWindowTab,
        ),
    {
        ssr: false,
    },
)

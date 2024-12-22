import dynamic from 'next/dynamic'

export const DropDownMenu = dynamic(
    () =>
        import(
            /* webpackChunkName: "Header-User-DropDown-Menu" */ './ui/DropDownMenu'
        ).then((d) => d.DropDownMenu),
    { ssr: false },
)

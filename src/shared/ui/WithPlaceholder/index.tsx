import type { JSX, MemoExoticComponent, ReactNode } from 'react'

type TGetProps<T extends any> = T extends (...args: infer Args) => any
    ? Args[0]
    : unknown

type EnteredComponent =
    | ((props: any) => JSX.Element | ReactNode)
    | MemoExoticComponent<any>

type TReturnedComponent<T extends EnteredComponent> = (
    props: TGetProps<T>,
) => JSX.Element

type TWitchPlaceholder = <T extends EnteredComponent>({
    Component,
}: {
    Component: T
    placeholder: JSX.Element
    showPlaceholder: boolean
}) => TReturnedComponent<T>

export const WithPlaceholder: TWitchPlaceholder = ({
    Component,
    showPlaceholder,
    placeholder,
}) => {
    return function ReturnedComponent(args) {
        return showPlaceholder ? placeholder : <Component {...args} />
    }
}

import type {
    ComponentPropsWithRef,
    Dispatch,
    Ref,
    SetStateAction,
} from 'react'

export interface Tag {
    tagId: string
    label: string
}

export type TOnChange = (tags: Tag[]) => void

export interface InputProps
    extends Omit<ComponentPropsWithRef<'input'>, 'onChange'> {
    setTags: Dispatch<SetStateAction<Tag[]>>
    onChange?: (tags: Tag[]) => void
    tags: Tag[]
    ref?: Ref<HTMLInputElement>
}

export type TDefaultTagsValue = Tag[] | []

export interface InputWithTagsProps {
    className?: string
    defaultValue?: TDefaultTagsValue
    onClick?: (tag: Tag) => void
    onChange?: (tags: Tag[]) => void
    disabled?: boolean
    name?: string
    value?: Tag[]
    ref?: Ref<HTMLInputElement>
}

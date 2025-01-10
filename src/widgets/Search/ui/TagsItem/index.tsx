import s from './s.module.scss'
interface TagsItemProps {
    tag: string
}
export const TagsItem = (props: TagsItemProps) => {
    const { tag } = props
    return <div className={s.tag}>{tag}</div>
}

import s from './s.module.scss'

interface DescriptionProps {
    children?: string
}
export const Description = (props: DescriptionProps) => {
    return <p className={s.description}>{props.children}</p>
}

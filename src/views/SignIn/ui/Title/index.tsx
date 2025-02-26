import s from './s.module.scss'

interface TitleProps {
    children: string
}

export const Title = ({ children }: TitleProps) => {
    return <h1 className={s.title}>{children}</h1>
}

import { clsx } from 'clsx'

import s from './buttons.module.scss'

interface EditBtnProps {
    className?: string
}
export const EditBtn = (props: EditBtnProps) => {
    const { className } = props
    
    return <button className={clsx(s.btn, className)}>Изменить</button>
}

import s from './userFIrstName.module.scss'

interface UserFullNameProps {
    firstName?: string
    lastName?: string
}

export const UserFullName = (props: UserFullNameProps) => {
    const { firstName, lastName } = props
    return <p className={s['full-name']}>{firstName + ' ' + lastName}</p>
}

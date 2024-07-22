import { SearchInput } from '@/entities/posts'
import { UserProfileIcon } from '@/features/user'

import { NavigationGroup } from './NavigationGroup'
import s from './s.module.sass'

export const Header = () => {
    return (
        <header className={s.header}>
            <NavigationGroup className={s['nav-group']} />
            <SearchInput className={s['search']} />
            <div className={s['user-bar']}>
                <UserProfileIcon />
            </div>
        </header>
    )
}

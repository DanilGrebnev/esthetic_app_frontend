import { SearchInput } from '@/entities/posts'
import { UserProfileIcon } from '@/features/user'

import { LeftNavigationGroup } from './LeftNavigationGroup'

const url = 'http://88.87.85.167:15551/api/'

export const Header = () => {
    return (
        <header className='sticky top-0 flex gap-[--global-gap] border-b-[1px] border-solid border-[silver] bg-[--theme-bg-color-1] p-[10px]'>
            <LeftNavigationGroup />
            <SearchInput />
            <div className='flex grow justify-end'>
                <UserProfileIcon />
            </div>
        </header>
    )
}

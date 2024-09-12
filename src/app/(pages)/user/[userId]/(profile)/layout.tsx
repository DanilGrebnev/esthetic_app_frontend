import { UserHeaderLayout } from '@/features/user'
import type { FC, ReactNode } from 'react'

interface UserLayout {
    children: ReactNode
    params: {
        userId: string
    }
}

const UserLayout: FC<UserLayout> = ({ children, params }) => {
    return (
        <div id='User layout'>
            <UserHeaderLayout userId={params.userId} />
            {children}
        </div>
    )
}

export default UserLayout

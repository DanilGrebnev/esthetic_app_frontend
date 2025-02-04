import { UserFullName } from '@/features/user'
import { routes } from '@/shared/routes'
import { Skeleton } from '@/shared/ui/Skeleton'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import Link from 'next/link'

interface UserInfoProps {
    className?: string
    avatar?: string | null
    avatarBlur?: string
    userId?: string
    firstName?: string
    lastName?: string

    loading?: boolean
}
export const UserInfo = (props: UserInfoProps) => {
    const {
        className,
        loading,
        avatar,
        avatarBlur,
        firstName,
        lastName,
        userId,
    } = props

    return (
        <div className={className}>
            {loading ? (
                <>
                    <Skeleton className='h-[35px] w-[35px]' />
                    <Skeleton className='w-[150px] h-[21px]' />
                </>
            ) : (
                <>
                    <Link href={routes.userCreatedPosts.getRoute(userId)}>
                        <UserAvatar
                            href={avatar}
                            blurSrc={avatarBlur}
                            word={firstName?.[0]}
                            size='m'
                        />
                    </Link>
                    <UserFullName
                        size='normal'
                        firstName={firstName}
                        lastName={lastName}
                    />
                </>
            )}
        </div>
    )
}

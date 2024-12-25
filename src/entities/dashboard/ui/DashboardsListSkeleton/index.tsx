import { DashboardsContainer } from '@/entities/dashboard'
import { DashboardsTileSkeleton, FavoritesTile } from '@/entities/dashboard'
import { nanoid } from 'nanoid'

export const DashboardsListSkeleton = () => {
    return (
        <DashboardsContainer>
            {Array(7)
                .fill('')
                .map(() => (
                    <DashboardsTileSkeleton key={nanoid()} />
                ))}
        </DashboardsContainer>
    )
}

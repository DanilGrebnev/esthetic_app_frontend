import { DashboardsContainer } from '@/entities/dashboard'
import { DashboardsTileSkeleton, FavoritesTile } from '@/shared/ui/Tiles'
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
